import Link from "next/link"

import { Title } from "@/components/ui/title"
import { SharedCVPreview } from "@/components/SharedCVPreview"
import { getSharedCv } from "@/app/(app)/actions"

export default async function Live({ params }: any) {
  const uuid = params.uuid

  const data = (await getSharedCv(uuid)) as any

  if (!data) {
    return <div>Not found</div>
  }

  return (
    <>
      <Link
        href={"/"}
        className="mb-4 flex shrink-0 items-center justify-center"
      >
        <Title className="font-bold text-black">Recharged CV</Title>
      </Link>
      <SharedCVPreview cv={data.cv} />
    </>
  )
}
