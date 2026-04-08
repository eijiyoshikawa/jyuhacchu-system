"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  baseUrl?: string
  searchParams?: Record<string, string>
}

export function Pagination({ currentPage, totalPages, onPageChange, baseUrl, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  function buildHref(page: number): string {
    const params = new URLSearchParams()
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && key !== "page") {
          params.set(key, value)
        }
      })
    }
    params.set("page", String(page))
    return `${baseUrl}?${params.toString()}`
  }

  function renderPageButton(page: number | string, index: number) {
    if (page === "...") {
      return (
        <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-gray-500">
          ...
        </span>
      )
    }

    const pageNum = page as number
    const isActive = pageNum === currentPage

    if (baseUrl) {
      return (
        <Link
          key={pageNum}
          href={buildHref(pageNum)}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {pageNum}
        </Link>
      )
    }

    return (
      <Button
        key={pageNum}
        variant={isActive ? "default" : "ghost"}
        size="sm"
        onClick={() => onPageChange?.(pageNum)}
        disabled={isActive}
      >
        {pageNum}
      </Button>
    )
  }

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages

  if (baseUrl) {
    return (
      <nav className="flex items-center justify-center gap-1">
        <Link
          href={prevDisabled ? "#" : buildHref(currentPage - 1)}
          className={cn(
            "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors",
            prevDisabled
              ? "pointer-events-none opacity-50"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
          aria-disabled={prevDisabled}
        >
          前へ
        </Link>
        {pages.map((page, i) => renderPageButton(page, i))}
        <Link
          href={nextDisabled ? "#" : buildHref(currentPage + 1)}
          className={cn(
            "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors",
            nextDisabled
              ? "pointer-events-none opacity-50"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
          aria-disabled={nextDisabled}
        >
          次へ
        </Link>
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-1">
      <Button variant="ghost" size="sm" disabled={prevDisabled} onClick={() => onPageChange?.(currentPage - 1)}>
        前へ
      </Button>
      {pages.map((page, i) => renderPageButton(page, i))}
      <Button variant="ghost" size="sm" disabled={nextDisabled} onClick={() => onPageChange?.(currentPage + 1)}>
        次へ
      </Button>
    </nav>
  )
}

function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = [1]

  if (current > 3) {
    pages.push("...")
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push("...")
  }

  pages.push(total)
  return pages
}
