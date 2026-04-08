import { Badge } from "@/components/ui/badge"
import { orderStatusLabels, invoiceStatusLabels, projectStatusLabels } from "@/lib/auth-helpers"

const orderStatusColors: Record<string, string> = {
  DRAFT: "bg-gray-200 text-gray-800 border border-gray-300",
  PENDING_APPROVAL: "bg-amber-100 text-amber-900 border border-amber-300",
  APPROVED: "bg-blue-100 text-blue-900 border border-blue-300",
  ORDERED: "bg-indigo-100 text-indigo-900 border border-indigo-300",
  ACCEPTED: "bg-purple-100 text-purple-900 border border-purple-300",
  DELIVERY_REPORTED: "bg-teal-100 text-teal-900 border border-teal-300",
  INSPECTED: "bg-green-100 text-green-900 border border-green-300",
  REJECTED: "bg-red-100 text-red-900 border border-red-300",
  CANCELLED: "bg-gray-200 text-gray-500 border border-gray-300",
}

const invoiceStatusColors: Record<string, string> = {
  DRAFT: "bg-gray-200 text-gray-800 border border-gray-300",
  SUBMITTED: "bg-amber-100 text-amber-900 border border-amber-300",
  APPROVED: "bg-green-100 text-green-900 border border-green-300",
  REJECTED: "bg-red-100 text-red-900 border border-red-300",
  PAID: "bg-blue-100 text-blue-900 border border-blue-300",
}

const projectStatusColors: Record<string, string> = {
  IN_PROGRESS: "bg-blue-100 text-blue-900 border border-blue-300",
  COMPLETED: "bg-green-100 text-green-900 border border-green-300",
  CANCELLED: "bg-gray-200 text-gray-500 border border-gray-300",
}

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <Badge className={orderStatusColors[status] || "bg-gray-100 text-gray-800"} variant="outline">
      {orderStatusLabels[status] || status}
    </Badge>
  )
}

export function InvoiceStatusBadge({ status }: { status: string }) {
  return (
    <Badge className={invoiceStatusColors[status] || "bg-gray-100 text-gray-800"} variant="outline">
      {invoiceStatusLabels[status] || status}
    </Badge>
  )
}

export function ProjectStatusBadge({ status }: { status: string }) {
  return (
    <Badge className={projectStatusColors[status] || "bg-gray-100 text-gray-800"} variant="outline">
      {projectStatusLabels[status] || status}
    </Badge>
  )
}
