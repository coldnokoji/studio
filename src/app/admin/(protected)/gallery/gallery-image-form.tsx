'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GalleryImage } from '@/lib/types';
import { saveGalleryImageAction } from '@/app/admin/(protected)/gallery/actions';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/image-uploader';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  imageUrl: z.string().url('An image upload is required'),
  aiHint: z.string().optional(),
});

type GalleryImageFormValues = z.infer<typeof formSchema>;

export function GalleryImageForm({ image }: { image?: GalleryImage }) {
  const router = useRouter();
  const methods = useForm<GalleryImageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: image || {
      title: '',
      imageUrl: '',
      aiHint: '',
    },
  });

  const onSubmit = async (values: GalleryImageFormValues) => {
    await saveGalleryImageAction(image?.id, values);
    router.push('/admin/gallery');
    router.refresh();
  };

  return (
    <FormProvider {...methods}>
        <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
            <FormField
            control={methods.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image Title</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Community Health Camp" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={methods.control}
                name="imageUrl"
                render={() => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <ImageUploader name="imageUrl" initialImageUrl={image?.imageUrl} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
            control={methods.control}
            name="aiHint"
            render={({ field }) => (
                <FormItem>
                <FormLabel>AI Hint</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., happy children" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Saving...' : 'Save Image'}
            </Button>
        </form>
        </Form>
    </FormProvider>
  );
}
