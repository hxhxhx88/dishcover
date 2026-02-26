'use client'

import type { JSX } from 'react'
import type { Row } from './utils'
import { DataTable } from '@repo/ui-web/data-table'
import { makeColumns } from './columns'

interface Props {
  rows: Row[]
  className?: string
}

export function TableUsers({ rows, className }: Props): JSX.Element {
  const columns = makeColumns()
  return <DataTable columns={columns} data={rows} className={className} />
}
