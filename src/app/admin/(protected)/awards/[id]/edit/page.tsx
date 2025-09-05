import { AwardForm } from '@/app/admin/(protected)/awards/award-form';
import { getAwardById } from '@/services/firestore';
import { notFound } from 'next/navigation';

export default async function EditAwardPage({ params }: { params: { id: string } }) {
  const award = await getAwardById(params.id);

  if (!award) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Edit Award</h1>
      <AwardForm award={award} />
    </div>
  );
}
