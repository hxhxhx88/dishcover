import type { PrismaClient } from '@repo/db'
import { newDatabase } from '@repo/db'
import { cookieNames } from '@repo/lib/http'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { env } from './env'

export async function connectDatabase(): Promise<PrismaClient> {
  const cookieStore = await cookies()
  const database = cookieStore.get(cookieNames.database)
  const connStr = database?.value ?? env.DATABASE_URL
  return newDatabase(connStr)
}

export function parseDatabaseError(e: unknown): { message: string } | undefined {
  const schemaCause = z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('UniqueConstraintViolation'),
      constraint: z.object({
        fields: z.array(z.string()),
      }),
    }),
  ])

  const schemaError = z.object({
    meta: z.object({
      modelName: z.enum(['User']),
      driverAdapterError: z.object({
        cause: schemaCause,
      }),
    }),
  })

  const parsed = schemaError.safeParse(e)

  if (!parsed.success) {
    return undefined
  }

  const { modelName, driverAdapterError: { cause } } = parsed.data.meta

  switch (cause.kind) {
    case 'UniqueConstraintViolation': {
      if (modelName === 'User' && cause.constraint.fields.length === 1 && cause.constraint.fields[0] === 'email') {
        return { message: 'User email already in use.' }
      }
    }
  }

  return undefined
}
