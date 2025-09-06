'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImpactStory } from '@/lib/types';
import { saveImpactStoryAction } from '@/app/admin/(protected)/impact/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  quote: z.string().min(10, 'Quote is required'),
  story: z.string().min(20, 'Story is required'),
  personName: z.string().min(2, "Person's name is required"),
  image: z.string().url('Must be a valid URL'),
  aiHint: z.string().optional(),
});

type ImpactStoryFormValues = z.infer<typeof formSchema>;

export function ImpactStoryForm({ story }: { story?: ImpactStory }) {
  const router = useRouter();
  const form = useForm<ImpactStoryFormValues>({
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://picsum.photos/600/400" {...field} />
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
                <Input placeholder="e.g. happy person" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Story'}
        </Button>
      </form>
    </Form>
  );
}
