'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Award } from '@/lib/types';
import { saveAwardAction } from '@/app/admin/awards/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  issuer: z.string().min(2, 'Issuer is required'),
  year: z.string().min(4, 'Year is required'),
  image: z.string().url('Must be a valid URL'),
  aiHint: z.string().optional(),
});

type AwardFormValues = z.infer<typeof formSchema>;

export function AwardForm({ award }: { award?: Award }) {
  const router = useRouter();
  const form = useForm<AwardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: award || {
      title: '',
      issuer: '',
      year: '',
      image: '',
      aiHint: '',
    },
  });

  const onSubmit = async (values: AwardFormValues) => {
    await saveAwardAction(award?.id, values);
    router.push('/admin/awards');
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
                <Input placeholder="Award Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issuer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issuer</FormLabel>
              <FormControl>
                <Input placeholder="Award Issuer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="Year" {...field} />
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
                <Input placeholder="https://picsum.photos/400/300" {...field} />
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
                <Input placeholder="e.g. award trophy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Award'}
        </Button>
      </form>
    </Form>
  );
}
