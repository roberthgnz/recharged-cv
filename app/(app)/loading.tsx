import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="animation-pulse mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="aspect-[9/16]" />
      ))}
    </div>
  )
}
