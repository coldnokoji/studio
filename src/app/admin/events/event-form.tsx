'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Event } from '@/lib/types';
import { saveEventAction } from '@/app/admin/events/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(10, 'Description is required'),
  image: z.string().url('Must be a valid URL'),
  aiHint: z.string().optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

export function EventForm({ event }: { event?: Event }) {
  const router = useRouter();
  const form = useForm<EventFormValues>({
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
    // Convert date string back to ISO format for saving
    const dataToSave = {
        ...values,
        date: new Date(values.date).toISOString()
    }
    await saveEventAction(event?.id, dataToSave);
    router.push('/admin/events');
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
                <Input placeholder="Event Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
          control={form.control}
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
                <Input placeholder="e.g. medical camp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Event'}
        </Button>
      </form>
    </Form>
  );
}
