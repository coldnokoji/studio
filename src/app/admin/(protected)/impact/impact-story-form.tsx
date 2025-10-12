'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImpactStory } from '@/lib/types';
import { saveImpactStoryAction } from '@/app/admin/(protected)/impact/actions';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/image-uploader';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  quote: z.string().min(10, 'Quote is required'),
  story: z.string().min(20, 'Story is required'),
  personName: z.string().min(2, "Person's name is required"),
  image: z.string().url('An image upload is required'),
  aiHint: z.string().optional(),
});

type ImpactStoryFormValues = z.infer<typeof formSchema>;

export function ImpactStoryForm({ story }: { story?: ImpactStory }) {
  const router = useRouter();
  const methods = useForm<ImpactStoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: story || {
      title: '',
      quote: '',
      story: '',
      personName: '',
      image: '',
      aiHint: '',
    },
  });

  const onSubmit = async (values: ImpactStoryFormValues) => {
    await saveImpactStoryAction(story?.id, values);
    router.push('/admin/impact');
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
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input placeholder="Story Title" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={methods.control}
            name="quote"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Quote</FormLabel>
                <FormControl>
                    <Textarea placeholder="A powerful quote from the story" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={methods.control}
            name="story"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Story</FormLabel>
                <FormControl>
                    <Textarea placeholder="The full success story" rows={6} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={methods.control}
            name="personName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Person's Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. Priya S." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={methods.control}
                name="image"
                render={() => (
                    <FormItem>
                        <FormLabel>Story Image</FormLabel>
                        <FormControl>
                            <ImageUploader name="image" initialImageUrl={story?.image} />
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
                    <Input placeholder="e.g. happy person" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Saving...' : 'Save Story'}
            </Button>
        </form>
        </Form>
    </FormProvider>
  );
}
