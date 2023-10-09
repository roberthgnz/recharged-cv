import { Card } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 animation-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="h-[120px]" />
      ))}
    </div>
  );
}
