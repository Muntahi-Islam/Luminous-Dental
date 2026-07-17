"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  className?: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  pagination?: Pagination
  onPageChange?: (page: number) => void
  onRowClick?: (row: T) => void
  onSort?: (key: string, direction: "asc" | "desc") => void
  selectedRows?: Set<number | string>
  onRowSelect?: (id: number | string) => void
  onSelectAll?: () => void
  bulkActions?: React.ReactNode
  loading?: boolean
  emptyState?: {
    title: string
    description: string
    action?: React.ReactNode
  }
  rowKey?: (row: T) => number | string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pagination,
  onPageChange,
  onRowClick,
  onSort,
  selectedRows,
  onRowSelect,
  onSelectAll,
  bulkActions,
  loading,
  emptyState,
  rowKey,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")

  const handleSort = (key: string) => {
    const newDir = sortKey === key && sortDir === "asc" ? "desc" : "asc"
    setSortKey(key)
    setSortDir(newDir)
    onSort?.(key, newDir)
  }

  const allSelected = data.length > 0 && selectedRows && data.every((row, i) => selectedRows.has(rowKey ? rowKey(row) : i))

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <div className="p-4 border-b border-border">
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="divide-y divide-border-light">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              {Array.from({ length: columns.length }).map((_, j) => (
                <Skeleton key={j} className="h-5 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className="rounded-lg border border-border bg-surface p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-warm">
          <Inbox className="h-8 w-8 text-ink-muted" />
        </div>
        <h3 className="text-lg font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">{emptyState.title}</h3>
        <p className="mt-1 text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">{emptyState.description}</p>
        {emptyState.action && <div className="mt-4">{emptyState.action}</div>}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      {selectedRows && selectedRows.size > 0 && bulkActions && (
        <div className="flex items-center gap-3 border-b border-border bg-accent-light px-4 py-3">
          <span className="text-sm font-medium text-accent font-[family-name:var(--font-dm-sans)]">
            {selectedRows.size} selected
          </span>
          {bulkActions}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-warm">
              {selectedRows && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={!!allSelected}
                    onChange={onSelectAll}
                    className="h-4 w-4 rounded border-border accent-accent"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]",
                    col.sortable && "cursor-pointer select-none hover:text-ink-secondary",
                    col.className
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-accent">{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {data.map((row, i) => {
              const id = rowKey ? rowKey(row) : i
              const isSelected = selectedRows?.has(id) ?? false
              return (
                <tr
                  key={id}
                  className={cn(
                    "transition-colors duration-150",
                    onRowClick && "cursor-pointer hover:bg-surface-warm/50",
                    isSelected && "bg-accent-light/50"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectedRows && (
                    <td className="w-12 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onRowSelect?.(id)}
                        className="h-4 w-4 rounded border-border accent-accent"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-4 py-3 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]", col.className)}>
                      {col.render ? col.render(row[col.key] as T[keyof T], row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-3">
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
            Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
            {pagination.total} results
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page <= 1}
              onClick={() => onPageChange?.(1)}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page <= 1}
              onClick={() => onPageChange?.(pagination.page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(pagination.totalPages, 5) }).map((_, i) => {
              let pageNum: number
              if (pagination.totalPages <= 5) {
                pageNum = i + 1
              } else if (pagination.page <= 3) {
                pageNum = i + 1
              } else if (pagination.page >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i
              } else {
                pageNum = pagination.page - 2 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={pagination.page === pageNum ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 text-xs"
                  onClick={() => onPageChange?.(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange?.(pagination.page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange?.(pagination.totalPages)}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
