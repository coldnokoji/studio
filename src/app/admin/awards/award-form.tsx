'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Award } from '@/lib/types';
import { saveAwardAction } from '@/app/admin/awards/actions';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/image-uploader';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  issuer: z.string().min(2, 'Issuer is required'),
  year: z.string().min(4, 'Year is required'),
  image: z.string().url('An image upload is required'),
  aiHint: z.string().optional(),
});

type AwardFormValues = z.infer<typeof formSchema>;

export function AwardForm({ award }: { award?: Award }) {
  const router = useRouter();
  const methods = useForm<AwardFormValues>({
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
                  <Input placeholder="Award Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
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
            control={methods.control}
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
            control={methods.control}
            name="image"
            render={() => (
                <FormItem>
                    <FormLabel>Award Image</FormLabel>
                    <FormControl>
                        <ImageUploader name="image" initialImageUrl={award?.image} />
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
                  <Input placeholder="e.g. award trophy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Saving...' : 'Save Award'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
