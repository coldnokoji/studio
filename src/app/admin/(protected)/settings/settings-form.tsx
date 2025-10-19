'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImageUploader } from '@/components/image-uploader';
import { saveSiteSettingsAction } from './actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { SiteSettings } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  founderPortrait: z.string().url('An image upload is required for the Founder Portrait'),
  homeHeroCommunity: z.string().url('An image upload is required for the Home Hero Community image'),
  projectGyan: z.string().url('An image upload is required for Project Gyan'),
  projectArogya: z.string().url('An image upload is required for Project Arogya'),
  getInvolvedVolunteer: z.string().url('An image upload is required for the Get Involved Volunteer image'),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const methods = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: settings || {
      founderPortrait: '',
      homeHeroCommunity: '',
      projectGyan: '',
      projectArogya: '',
      getInvolvedVolunteer: '',
    },
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
        await saveSiteSettingsAction(values);
        toast.success('Site Settings Saved!', {
            description: 'Your changes have been successfully published.',
        });
        router.refresh();
    } catch (error: any) {
        toast.error('Failed to Save Settings', {
            description: error.message || 'An unknown error occurred.',
        });
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>Key Images</CardTitle>
                    <CardDescription>
                        These images are used on the Home, About, and Get Involved pages.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <FormField
                        control={methods.control}
                        name="founderPortrait"
                        render={() => (
                            <FormItem>
                                <FormLabel>Founder's Portrait (About Page)</FormLabel>
                                <FormControl>
                                    <ImageUploader name="founderPortrait" initialImageUrl={settings.founderPortrait} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={methods.control}
                        name="homeHeroCommunity"
                        render={() => (
                            <FormItem>
                                <FormLabel>Home Page "Who We Are" Image</FormLabel>
                                <FormControl>
                                    <ImageUploader name="homeHeroCommunity" initialImageUrl={settings.homeHeroCommunity} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="projectGyan"
                        render={() => (
                            <FormItem>
                                <FormLabel>Project Gyan Image (Home Page)</FormLabel>
                                <FormControl>
                                    <ImageUploader name="projectGyan" initialImageUrl={settings.projectGyan} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="projectArogya"
                        render={() => (
                            <FormItem>
                                <FormLabel>Project Arogya Image (Home Page)</FormLabel>
                                <FormControl>
                                    <ImageUploader name="projectArogya" initialImageUrl={settings.projectArogya} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="getInvolvedVolunteer"
                        render={() => (
                            <FormItem>
                                <FormLabel>Volunteer Image (Get Involved Page)</FormLabel>
                                <FormControl>
                                    <ImageUploader name="getInvolvedVolunteer" initialImageUrl={settings.getInvolvedVolunteer} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Button type="submit" disabled={methods.formState.isSubmitting}>
                {methods.formState.isSubmitting ? 'Saving...' : 'Save All Settings'}
            </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
