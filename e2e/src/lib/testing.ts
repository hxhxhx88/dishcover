import type { Tx } from '@repo/db'
import type { Suite } from 'mocha'
import { createId } from '@paralleldrive/cuid2'
import { newDatabase } from '@repo/db'
import { TEST_DATABASE_NAME } from '@/lib/constants'
import { env } from '@/lib/env'
import { env as wenv } from '@/lib/env-worker'
import { log } from '@/lib/logging'
import { createNeonBranch, neon } from '@/lib/neon'

// Use a class to encapsulate the test case context to avoid reading `databaseUrl` by destructuring in the test cases before it is initialized.
class TestCaseContext {
  #databaseUrl: string

  constructor({ databaseUrl}: { databaseUrl: string }) {
    this.#databaseUrl = databaseUrl
  }

  getDatabaseUrl(): string {
    return this.#databaseUrl
  }

  setDatabaseUrl(databaseUrl: string) {
    this.#databaseUrl = databaseUrl
  }
}

export function suiteIsolated(
  name: string,
  initDatabase: ((tx: Tx) => Promise<void>) | undefined,
  testCases: (ctx: TestCaseContext) => void,
): Suite {
  return describe(name, () => {
    const suiteId = createId()
    let dataBranchId: string | undefined
    let caseBranchId: string | undefined

    const ctx = new TestCaseContext({
      databaseUrl: '',
    })

    before(async () => {
      // Create the data branch for this suite from the schema branch
      const { id: branchId, endpoint } = await createNeonBranch({
        name: `e2e-${wenv.TEST_ID}-${suiteId}`,
        parentId: wenv.DB_BRANCH_ID, // from the schema branch
      })
      log.info(`Data branch created: ${branchId}`)

      dataBranchId = branchId

      // populate initial data if provided
      if (initDatabase) {
        log.info('Populating initial data')
        const connStr = `postgres://${wenv.DB_USERNAME}:${wenv.DB_PASSWORD}@${endpoint}/${TEST_DATABASE_NAME}?sslmode=require`
        const db = newDatabase(connStr)
        await db.$transaction(initDatabase, { maxWait: 30 * 1000 })
      }
    })

    after(async () => {
      if (dataBranchId) {
        log.info(`Deleting data branch: ${dataBranchId}`)
        await neon.deleteProjectBranch(env.NEON_PROJECT_ID_TEST, dataBranchId)
      }
    })

    beforeEach(async () => {
      if (!dataBranchId) {
        throw new Error('missing data branch')
      }

      const caseId = createId()
      const { id: branchId, endpoint } = await createNeonBranch({
        name: `e2e-${wenv.TEST_ID}-${suiteId}-${caseId}`,
        parentId: dataBranchId, // from the data branch
      })
      log.info(`Case branch created: ${branchId}`)

      caseBranchId = branchId

      // construct the connection string
      const databaseUrl = `postgres://${wenv.DB_USERNAME}:${wenv.DB_PASSWORD}@${endpoint}/${TEST_DATABASE_NAME}?sslmode=require`
      ctx.setDatabaseUrl(databaseUrl)
      log.info(`Test case database URL: ${databaseUrl}`)
    })

    afterEach(async () => {
      if (caseBranchId) {
        log.info(`Deleting case branch: ${caseBranchId}`)
        await neon.deleteProjectBranch(env.NEON_PROJECT_ID_TEST, caseBranchId)
      }
    })

    testCases(ctx)
  })
}
