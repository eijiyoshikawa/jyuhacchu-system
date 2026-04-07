"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut } from "lucide-react"
import { roleLabels } from "@/lib/auth-helpers"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <div className="text-right">
              <div className="text-sm font-medium">{session.user.name}</div>
              <div className="text-xs text-muted-foreground">
                {session.user.companyName}
              </div>
            </div>
            <Badge variant="secondary">
              {roleLabels[session.user.role] || session.user.role}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
