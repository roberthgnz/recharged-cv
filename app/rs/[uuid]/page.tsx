import { MinimalSharedCVPreview } from "@/components/MinimalSharedCVPreview"
import { getSharedCv } from "@/app/(app)/actions"

export default async function Live({ params }: any) {
  const uuid = params.uuid

  const data = (await getSharedCv(uuid)) as any

  if (!data) {
    return <div>Not found</div>
  }

  return <MinimalSharedCVPreview cv={data.cv} />
}
