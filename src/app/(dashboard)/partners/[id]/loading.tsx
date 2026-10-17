import { FormPageSkeleton } from "@/components/ui/skeleton"

/** 会社情報編集フォーム。 */
export default function PartnerDetailLoading() {
  return <FormPageSkeleton pairedFields={1} fields={5} />
}
