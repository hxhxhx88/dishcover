import type { Operation } from '@neondatabase/api-client'
import { createApiClient, EndpointType } from '@neondatabase/api-client'
import pRetry, { AbortError } from 'p-retry'
import { env } from './env'
import { log } from './logging'

export const neon = createApiClient({
  apiKey: env.NEON_API_KEY,
})

const TERMINAL_OP_STATUSES = new Set(['finished', 'failed', 'error', 'cancelled', 'skipped'])

// Neon returns 423 (Locked) if you mutate a branch while operations are still
// in progress. Polling branch `current_state` alone is not enough — we must
// wait for every operation returned by the create call to reach a terminal state.
async function waitForOperations(operations: Operation[]) {
  await Promise.all(operations.map(op =>
    pRetry(async () => {
      const resp = await neon.getProjectOperation(env.NEON_PROJECT_ID_TEST, op.id)
      const { status } = resp.data.operation
      if (!TERMINAL_OP_STATUSES.has(status)) {
        throw new Error(`operation ${op.id} (${op.action}) still ${status}`)
      }
      // Non-finished terminal state — no point retrying
      if (status !== 'finished') {
        throw new AbortError(`operation ${op.id} (${op.action}) ended with status: ${status}`)
      }
    }, { retries: 20, minTimeout: 1000, factor: 1.5 }),
  ))
}

interface CreateBranchInput {
  name: string
  parentId?: string
}

interface CreateBranchOutput {
  id: string
  endpoint: string
}

export async function createNeonBranch({ name, parentId }: CreateBranchInput): Promise<CreateBranchOutput> {
  log.info(`Creating branch: ${name}`)
  const resp = await neon.createProjectBranch(env.NEON_PROJECT_ID_TEST, {
    branch: { name, parent_id: parentId },
    endpoints: [{ type: EndpointType.ReadWrite }],
  })

  const endpoint = resp.data.endpoints[0]
  if (!endpoint) {
    throw new Error('missing endpoint')
  }

  log.info(`Waiting for ${resp.data.operations.length} operations to finish`)
  await waitForOperations(resp.data.operations)

  return { id: resp.data.branch.id, endpoint: endpoint.host }
}
