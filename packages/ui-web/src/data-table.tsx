'use client'

import type { ColumnDef, Header, RowSelectionState } from '@tanstack/react-table'
import type { JSX } from 'react'
import {

  flexRender,
  getCoreRowModel,

  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { cn } from './lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './primitives/table'

interface DataTableProps<Data, Value> {
  columns: Array<ColumnDef<Data, Value>>
  data: Data[]
  className?: string
  headerProps?: (head: Header<Data, Value>) => React.HTMLAttributes<HTMLTableCellElement>
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void
}

export function DataTable<Data, Value>({
  columns,
  data,
  className,
  headerProps,
  onRowSelectionChange,
}: DataTableProps<Data, Value>): JSX.Element {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  useEffect(() => {
    onRowSelectionChange?.(rowSelection)
  }, [onRowSelectionChange, rowSelection])

  return (
    <div className={cn('overflow-hidden rounded-md border', className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const width = header.getSize()

                return (
                  <TableHead
                    key={header.id}
                    style={{
                      ...(width ? { width } : undefined),
                    }}
                    // eslint-disable-next-line ts/consistent-type-assertions
                    {...headerProps?.(header as Header<Data, Value>)}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              )
            : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center" />
                </TableRow>
              )}
        </TableBody>
      </Table>
    </div>
  )
}
