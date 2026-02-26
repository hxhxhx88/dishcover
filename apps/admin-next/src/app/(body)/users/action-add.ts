'use server'

import type { FormTypeUserAdd } from '@/components/form-user-add'
import { connectDatabase, parseDatabaseError } from '@/lib/db'

interface OutputBad {
  type: 'bad'
  message: string
}

interface OutputOk {
  type: 'ok'
  id: string
}

type Output = OutputOk | OutputBad

export async function actionAddUser(formData: FormTypeUserAdd): Promise<Output> {
  const db = await connectDatabase()
  const { email } = formData
  try {
    const { id } = await db.user.create({
      data: { email },
      select: { id: true },
    })
    return { type: 'ok', id }
  }
  catch (e) {
    const error = parseDatabaseError(e)
    if (error) {
      return { type: 'bad', message: error.message }
    }
    throw e
  }
}
