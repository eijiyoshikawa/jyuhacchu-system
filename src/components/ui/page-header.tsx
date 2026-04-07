import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  createHref?: string
  createLabel?: string
}

export function PageHeader({ title, description, createHref, createLabel }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {createHref && (
        <Link href={createHref}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {createLabel || "新規作成"}
          </Button>
        </Link>
      )}
    </div>
  )
}
