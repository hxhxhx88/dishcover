import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'

export function createClient(connectionString: string): PrismaClient {
  const useNeon = connectionString.includes('neon.tech')

  const adapter = useNeon
    ? new PrismaNeon({ connectionString })
    // At the time of writing, there is a bug in `@prisma/adapter-pg` to not handle time zone properly.
    // - https://github.com/prisma/prisma/issues/28629
    // - https://github.com/prisma/prisma/issues/26786
    // And the following workaround to add a `options=...` parameter is from:
    // - https://github.com/umami-software/umami/issues/3810#issuecomment-3741543809
    : new PrismaPg({ connectionString: `${connectionString}?options=-c%20timezone%3DUTC` })
  return new PrismaClient({ adapter })
}
