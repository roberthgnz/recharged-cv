import { kv } from '@vercel/kv';

import Link from 'next/link';

import { SharedCVPreview } from '@/components/SharedCVPreview';
import { Title } from '@/components/ui/title';

export default async function Live({ params }: any) {
  const code = params.code;

  const data = await kv.get<{
    cv: any;
  }>(`shared-cv-${code}`);

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Link
        href={'/'}
        className="flex flex-shrink-0 items-center justify-center mb-4"
      >
        <Title className="font-bold text-black">Recharged CV</Title>
      </Link>
      <SharedCVPreview cv={data.cv} />
    </>
  );
}
