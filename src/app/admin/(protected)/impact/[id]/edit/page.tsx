import { ImpactStoryForm } from '@/app/admin/(protected)/impact/impact-story-form';
import { getImpactStoryById } from '@/services/firestore';
import { notFound } from 'next/navigation';

export default async function EditImpactStoryPage({ params }: { params: { id: string } }) {
  const story = await getImpactStoryById(params.id);

  if (!story) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Edit Impact Story</h1>
      <ImpactStoryForm story={story} />
    </div>
  );
}
