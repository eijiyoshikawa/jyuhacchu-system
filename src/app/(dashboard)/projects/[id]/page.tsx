"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

interface Project {
  id: string
  projectCode: string
  name: string
  description: string | null
  status: string
  address: string | null
  startDate: string | null
  endDate: string | null
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then((res) => res.json())
      .then(setProject)
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      description: formData.get("description") || null,
      status: formData.get("status"),
      address: formData.get("address") || null,
      startDate: formData.get("startDate") || null,
      endDate: formData.get("endDate") || null,
    }

    const res = await fetch(`/api/projects/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)
    if (res.ok) {
      router.push("/projects")
      router.refresh()
    }
  }

  async function handleDelete() {
    const res = await fetch(`/api/projects/${params.id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      router.push("/projects")
      router.refresh()
    }
  }

  if (!project) return <div className="text-center py-8">読み込み中...</div>

  return (
    <div className="max-w-2xl mx-auto sm:mx-0">
      <h1 className="mb-6 text-xl sm:text-2xl font-bold">案件詳細</h1>
      <Card>
        <CardHeader>
          <CardTitle>{project.projectCode} - {project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectCode">案件コード</Label>
              <Input id="projectCode" value={project.projectCode} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">案件名 *</Label>
              <Input id="name" name="name" defaultValue={project.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Input id="description" name="description" defaultValue={project.description || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">ステータス</Label>
              <Select id="status" name="status" defaultValue={project.status} required>
                <option value="IN_PROGRESS">進行中</option>
                <option value="COMPLETED">完了</option>
                <option value="CANCELLED">キャンセル</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">納入先 / 作業場所</Label>
              <Input id="address" name="address" defaultValue={project.address || ""} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">開始日</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={project.startDate ? project.startDate.slice(0, 10) : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">完了予定日</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={project.endDate ? project.endDate.slice(0, 10) : ""}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "保存中..." : "更新"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
                戻る
              </Button>
              <Button type="button" variant="destructive" onClick={() => setShowDeleteConfirm(true)} className="w-full sm:w-auto sm:ml-auto">
                削除
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="案件の削除"
        description="この案件を削除してもよろしいですか？この操作は取り消せません。"
        onConfirm={handleDelete}
        confirmLabel="削除"
        variant="destructive"
      />
    </div>
  )
}
