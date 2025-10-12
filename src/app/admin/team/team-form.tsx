'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TeamMember } from '@/lib/types';
import { saveTeamMemberAction } from '@/app/admin/team/actions';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/image-uploader';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required'),
  image: z.string().url('An image upload is required'),
  aiHint: z.string().optional(),
});

type TeamMemberFormValues = z.infer<typeof formSchema>;

export function TeamMemberForm({ member }: { member?: TeamMember }) {
  const router = useRouter();
  const methods = useForm<TeamMemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: member || {
      name: '',
      role: '',
      image: '',
      aiHint: '',
    },
  });

  const onSubmit = async (values: TeamMemberFormValues) => {
    await saveTeamMemberAction(member?.id, values);
    router.push('/admin/team');
    router.refresh();
  };

  return (
    <FormProvider {...methods}>
        <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
            <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={methods.control}
            name="role"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. Founder, Volunteer" {...field} />
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
                        <FormLabel>Member Portrait</FormLabel>
                        <FormControl>
                            <ImageUploader name="image" initialImageUrl={member?.image} />
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
                    <Input placeholder="e.g. headshot professional" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Saving...' : 'Save Member'}
            </Button>
        </form>
        </Form>
    </FormProvider>
  );
}
