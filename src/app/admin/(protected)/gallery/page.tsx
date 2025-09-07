import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getGalleryImages } from '@/services/firestore';
import { deleteGalleryImageAction } from '@/app/admin/(protected)/gallery/actions';

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <Button asChild>
          <Link href="/admin/gallery/new">Add New Image</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id}>
             <div className="relative h-48 w-full">
                <Image src={image.imageUrl} alt={image.title} fill className="object-cover rounded-t-lg" data-ai-hint={image.aiHint}/>
            </div>
            <CardHeader>
              <CardTitle>{image.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href={`/admin/gallery/${image.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteGalleryImageAction.bind(null, image.id)}>
                    <Button variant="destructive" type="submit">Delete</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
        {images.length === 0 && (
            <p>No images found in the gallery. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}
