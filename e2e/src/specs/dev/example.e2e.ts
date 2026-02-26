import { suiteIsolated } from '@/lib/testing'
import { resetClientState } from '@/lib/utils'

// There should be **only one** `suiteIsolated` block in each `.e2e.ts` file.
suiteIsolated('example suite', async (/* tx */) => {
  // Initialize database using `tx`
  await Promise.resolve()
}, (ctx) => {
  it('example test case #1', async () => {
    // Reset client state to the initial data. `ctx.getDatabaseUrl()` gives the database URL for the current test case.
    await resetClientState(driver, { databaseUrl: ctx.getDatabaseUrl() })

    // Actual test case steps
  })

  it('example test case #2', async () => {
    // Reset client state to the initial data. `ctx.getDatabaseUrl()` should give a **new** database URL.
    await resetClientState(driver, { databaseUrl: ctx.getDatabaseUrl() })

    // Actual test case steps
  })

  // More `it` blocks for more test cases
})
