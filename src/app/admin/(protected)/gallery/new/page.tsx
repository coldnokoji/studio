import { GalleryImageForm } from '@/app/admin/(protected)/gallery/gallery-image-form';

export default function NewGalleryImagePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Add New Image to Gallery</h1>
      <GalleryImageForm />
    </div>
  );
}
