'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GalleryImage } from '@/lib/types';
import { saveGalleryImageAction } from '@/app/admin/(protected)/gallery/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  aiHint: z.string().optional(),
});

type GalleryImageFormValues = z.infer<typeof formSchema>;

export function GalleryImageForm({ image }: { image?: GalleryImage }) {
  const router = useRouter();
  const form = useForm<GalleryImageFormValues>({
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
        <FormField
          control={form.control}
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
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://picsum.photos/800/600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Image'}
        </Button>
      </form>
    </Form>
  );
}
