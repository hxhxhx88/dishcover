import type { PrismaClient } from '@repo/db'
import { newDatabase } from '@repo/db'
import { cookieNames } from '@repo/lib/http'
import { cookies } from 'next/headers'
import { env } from './env'

export async function connectDatabase(): Promise<PrismaClient> {
  const cookieStore = await cookies()
  const database = cookieStore.get(cookieNames.database)
  const connStr = database?.value ?? env.DATABASE_URL
  return newDatabase(connStr)
}
