'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Event } from '@/lib/types';
import { saveEventAction } from '@/app/admin/events/actions';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/image-uploader';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(10, 'Description is required'),
  image: z.string().url('An image upload is required'),
  aiHint: z.string().optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

export function EventForm({ event }: { event?: Event }) {
  const router = useRouter();
  const methods = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: event ? { ...event, date: new Date(event.date).toISOString().split('T')[0] } : {
      title: '',
      date: '',
      description: '',
      image: '',
      aiHint: '',
    },
  });

  const onSubmit = async (values: EventFormValues) => {
    const dataToSave = {
        ...values,
        date: new Date(values.date).toISOString()
    }
    await saveEventAction(event?.id, dataToSave);
    router.push('/admin/events');
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
                    <Input placeholder="Event Title" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={methods.control}
            name="date"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                    <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={methods.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Event Description" {...field} />
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
                        <FormLabel>Event Image</FormLabel>
                        <FormControl>
                            <ImageUploader name="image" initialImageUrl={event?.image} />
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
                    <Input placeholder="e.g. medical camp" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Saving...' : 'Save Event'}
            </Button>
        </form>
        </Form>
    </FormProvider>
  );
}
