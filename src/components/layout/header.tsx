"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut } from "lucide-react"
import { roleLabels } from "@/lib/auth-helpers"

export function Header() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-1 items-center justify-end gap-3">
      {session?.user && (
        <>
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-800">{session.user.name}</div>
            <div className="text-xs text-slate-500">
              {session.user.companyName}
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex rounded-sm text-[10px]">
            {roleLabels[session.user.role] || session.user.role}
          </Badge>
          <div className="h-6 w-px bg-gray-200" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="text-slate-500 hover:text-slate-800"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}
