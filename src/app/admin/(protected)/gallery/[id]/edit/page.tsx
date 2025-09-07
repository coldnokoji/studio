import { GalleryImageForm } from '@/app/admin/(protected)/gallery/gallery-image-form';
import { getGalleryImageById } from '@/services/firestore';
import { notFound } from 'next/navigation';

export default async function EditGalleryImagePage({ params }: { params: { id: string } }) {
  const image = await getGalleryImageById(params.id);

  if (!image) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Edit Gallery Image</h1>
      <GalleryImageForm image={image} />
    </div>
  );
}
