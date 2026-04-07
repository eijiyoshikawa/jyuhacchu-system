import { Badge } from "@/components/ui/badge"
import { orderStatusLabels, invoiceStatusLabels, projectStatusLabels } from "@/lib/auth-helpers"

const orderStatusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  PENDING_APPROVAL: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-blue-100 text-blue-800",
  ORDERED: "bg-indigo-100 text-indigo-800",
  ACCEPTED: "bg-purple-100 text-purple-800",
  DELIVERY_REPORTED: "bg-teal-100 text-teal-800",
  INSPECTED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-500",
}

const invoiceStatusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  SUBMITTED: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  PAID: "bg-blue-100 text-blue-800",
}

const projectStatusColors: Record<string, string> = {
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-gray-100 text-gray-500",
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
