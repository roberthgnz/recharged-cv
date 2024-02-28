import { Card } from "@/components/ui/card"
import { Title } from "@/components/ui/title"

export default function Loading() {
  return (
    <div className="mt-6 size-full">
      <div className="grid h-full grid-cols-2">
        <div className="h-full bg-white p-4">
          <Title className="font-extrabold">Personal Details</Title>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`input-skeleton-${i}`}
              className="my-4 grid animate-pulse grid-cols-2 gap-2"
            >
              <div>
                <div className="mb-[1px] h-[19px] w-28 rounded-md border bg-gray-300 px-4 py-2"></div>
                <div className="h-9 w-full rounded-md border bg-gray-300 px-4 py-2"></div>
              </div>
              <div>
                <div className="mb-[1px] h-[19px] w-28 rounded-md border bg-gray-300 px-4 py-2"></div>
                <div className="h-9 w-full rounded-md border bg-gray-300 px-4 py-2"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-full bg-gray-600 p-8">
          <Card className="h-[210mm] animate-pulse rounded-lg bg-gray-300"></Card>
        </div>
      </div>
    </div>
  )
}
