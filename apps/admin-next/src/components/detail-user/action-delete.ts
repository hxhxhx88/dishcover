'use server'

import { connectDatabase } from '@/lib/db'

interface Input {
  userId: string
}

export async function actionDeleteUser(input: Input): Promise<void> {
  const db = await connectDatabase()

  const { userId } = input
  await db.user.delete({
    where: { id: userId },
  })
}
