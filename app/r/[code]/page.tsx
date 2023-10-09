import Link from "next/link"
import { kv } from "@vercel/kv"

import { Title } from "@/components/ui/title"
import { SharedCVPreview } from "@/components/SharedCVPreview"

export default async function Live({ params }: any) {
  const code = params.code

  const data = await kv.get<{
    cv: any
  }>(`shared-cv-${code}`)

  if (!data) {
    return <div>Not found</div>
  }

  return (
    <>
      <Link
        href={"/"}
        className="flex flex-shrink-0 items-center justify-center mb-4"
      >
        <Title className="font-bold text-black">Recharged CV</Title>
      </Link>
      <SharedCVPreview cv={data.cv} />
    </>
  )
}
