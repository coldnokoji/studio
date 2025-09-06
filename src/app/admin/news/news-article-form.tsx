'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { NewsArticle } from '@/lib/types';
import { saveNewsArticleAction } from '@/app/admin/news/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  author: z.string().min(2, 'Author is required'),
  summary: z.string().min(10, 'Summary is required'),
  content: z.string().min(50, 'Content is required'),
  image: z.string().url('Must be a valid URL'),
  aiHint: z.string().optional(),
});

type NewsArticleFormValues = z.infer<typeof formSchema>;

export function NewsArticleForm({ article }: { article?: NewsArticle }) {
  const router = useRouter();
  const form = useForm<NewsArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: article || {
      title: '',
      author: 'Shreyaskar Foundation',
      summary: '',
      content: '',
      image: '',
      aiHint: '',
    },
  });

  const onSubmit = async (values: NewsArticleFormValues) => {
    await saveNewsArticleAction(article?.id, values);
    router.push('/admin/news');
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
                <Input placeholder="Article Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Article Author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary of the article" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Content (Markdown supported)</FormLabel>
              <FormControl>
                <Textarea placeholder="The full content of the article." rows={10} {...field} />
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
              <FormLabel>Header Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://picsum.photos/1200/600" {...field} />
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
                <Input placeholder="e.g. community event" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Article'}
        </Button>
      </form>
    </Form>
  );
}
