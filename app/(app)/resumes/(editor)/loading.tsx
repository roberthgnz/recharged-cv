import { Card } from '@/components/ui/card';
import { Title } from '@/components/ui/title';

export default function Loading() {
  return (
    <div className="h-full w-full mt-6">
      <div className="grid grid-cols-2 h-full">
        <div className="h-full bg-white p-4">
          <Title className="font-extrabold">Personal Details</Title>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`input-skeleton-${i}`}
              className="grid grid-cols-2 gap-2 my-4 animate-pulse"
            >
              <div>
                <div className="w-28 h-[19px] mb-[1px] border bg-gray-300 pl-4 pr-4 py-2 rounded-md"></div>
                <div className="w-full h-9 border bg-gray-300 pl-4 pr-4 py-2 rounded-md"></div>
              </div>
              <div>
                <div className="w-28 h-[19px] mb-[1px] border bg-gray-300 pl-4 pr-4 py-2 rounded-md"></div>
                <div className="w-full h-9 border bg-gray-300 pl-4 pr-4 py-2 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-full bg-gray-600 p-8">
          <Card className="rounded-lg h-[210mm] bg-gray-300 animate-pulse"></Card>
        </div>
      </div>
    </div>
  );
}
