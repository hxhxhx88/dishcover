import type { Services } from '@wdio/types'
import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { createId } from '@paralleldrive/cuid2'
import { browser } from '@wdio/globals'
import pRetry from 'p-retry'
import { TEST_DATABASE_NAME } from './constants'
import { env } from './env'
import { log } from './logging'
import { createNeonBranch, neon } from './neon'

const execAsync = promisify(exec)

const testId = createId()

let schemaBranchId: string | undefined

// When starting a new e2e test run, we create a new branch in the test project and migrate the database schema (without data). Each test case then creates its own isolated database using this main database as a template, populated with its specific initial data.
export const onPrepare: Services.HookFunctions['onPrepare'] = async () => {
  // Create a new branch from the root
  const { id: branchId, endpoint } = await createNeonBranch({ name: `e2e-${testId}` })
  log.info(`Schema branch created: ${branchId}`)

  schemaBranchId = branchId

  // Create a new role for the new branch to generate a username and password at runtime
  log.info('Creating a new role')
  const respRole = await neon.createProjectBranchRole(
    env.NEON_PROJECT_ID_TEST,
    branchId,
    { role: { name: 'tester' } },
  )

  const username = respRole.data.role.name
  const password = respRole.data.role.password
  if (!username || !password) {
    throw new Error('missing username or password')
  }
  log.info(`Role created: ${username}`)

  // Create the new database for testing
  log.info('Creating the schema database')
  await neon.createProjectBranchDatabase(
    env.NEON_PROJECT_ID_TEST,
    branchId,
    { database: { name: TEST_DATABASE_NAME, owner_name: username } },
  )
  log.info(`Test database created: ${TEST_DATABASE_NAME}`)

  // construct the connection string
  const connectionString = `postgres://${username}:${password}@${endpoint}/${TEST_DATABASE_NAME}?sslmode=require`
  log.info(`Test database connection string: ${connectionString}`)

  // migrate the database schema
  log.info('Migrating database schema')
  await pRetry(() => execAsync(
    `npx prisma db push --schema ../packages/db/prisma/schema.prisma --url ${connectionString}`,
    { timeout: 60 * 1000 },
  ), { retries: 5 })
  log.info('Database schema migrated')

  // update environment variables which will be propogated to workers
  process.env.DB_BRANCH_ID = branchId
  process.env.DB_USERNAME = username
  process.env.DB_PASSWORD = password
  process.env.TEST_ID = testId
  process.env.VERIFICATION_PRIVATE_CODE = env.DEV_VERIFICATION_PRIVATE_CODE
}

export const onComplete: Services.HookFunctions['onComplete'] = async () => {
  if (schemaBranchId) {
    log.info(`Deleting schema branch: ${schemaBranchId}`)
    await neon.deleteProjectBranch(env.NEON_PROJECT_ID_TEST, schemaBranchId)
  }
}

export const afterTest: Services.HookFunctions['afterTest'] = async (test, context, { passed }) => {
  if (passed) {
    return
  }

  try {
    const filename = `${test.parent}-${test.title}`.replace(/[^\w-]/g, '_')
    const dir = path.join(process.cwd(), 'screenshots')
    await fs.mkdir(dir, { recursive: true })
    const filePath = path.join(dir, `${filename}.png`)
    await browser.saveScreenshot(filePath)
    log.info(`Saved screenshot to ${filePath}`)
  }
  catch (error) {
    log.error(`Failed to save screenshot: ${error}`)
  }
}
