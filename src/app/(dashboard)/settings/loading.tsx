import { FormPageSkeleton } from "@/components/ui/skeleton"

/** 設定（パスワード変更フォーム）。 */
export default function SettingsLoading() {
  return <FormPageSkeleton fields={3} buttons={1} />
}
