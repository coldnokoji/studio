
'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from '@/components/image-uploader';
import { saveSiteSettingsAction } from './actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { SiteSettings } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  // Text Content
  founderName: z.string().min(1, 'Founder name is required'),
  contactAddress: z.string().min(1, 'Address is required'),
  contactPhone: z.string().min(1, 'Phone number is required'),
  contactEmail: z.string().email('Must be a valid email'),

  // Videos
  homeHeroVideoUrl: z.string().url('A valid video URL is required'),

  // Images
  founderPortrait: z.string().url('An image upload is required'),
  homeHeroCommunity: z.string().url('An image upload is required'),
  getInvolvedVolunteer: z.string().url('An image upload is required'),

  // Program Images
  programEducationHero: z.string().url('An image upload is required'),
  programEducationGallery1: z.string().url('An image upload is required'),
  programEducationGallery2: z.string().url('An image upload is required'),
  programEducationGallery3: z.string().url('An image upload is required'),
  
  programHealthcareHero: z.string().url('An image upload is required'),
  programHealthcareGallery1: z.string().url('An image upload is required'),
  programHealthcareGallery2: z.string().url('An image upload is required'),
  programHealthcareGallery3: z.string().url('An image upload is required'),
  
  programEnvironmentHero: z.string().url('An image upload is required'),
  programEnvironmentGallery1: z.string().url('An image upload is required'),
  programEnvironmentGallery2: z.string().url('An image upload is required'),
  programEnvironmentGallery3: z.string().url('An image upload is required'),

  programLivelihoodHero: z.string().url('An image upload is required'),
  programLivelihoodGallery1: z.string().url('An image upload is required'),
  programLivelihoodGallery2: z.string().url('An image upload is required'),
  programLivelihoodGallery3: z.string().url('An image upload is required'),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const methods = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
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
                    <CardTitle>Text Content</CardTitle>
                    <CardDescription>Manage key text that appears across the site.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <FormField control={methods.control} name="founderName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Founder's Name</FormLabel>
                            <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={methods.control} name="contactEmail" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl><Input placeholder="e.g., contact@example.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={methods.control} name="contactPhone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl><Input placeholder="e.g., +91 12345 67890" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={methods.control} name="contactAddress" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Address</FormLabel>
                            <FormControl><Textarea placeholder="Full address" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Homepage Content</CardTitle>
                    <CardDescription>Manage content for the main homepage.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <FormField control={methods.control} name="homeHeroVideoUrl" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hero Background Video URL</FormLabel>
                            <FormControl><Input placeholder="https://example.com/video.mp4" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={methods.control} name="homeHeroCommunity" render={() => (
                        <FormItem>
                            <FormLabel>Home Page "Who We Are" Image</FormLabel>
                            <FormControl><ImageUploader name="homeHeroCommunity" initialImageUrl={settings.homeHeroCommunity} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>General Page Images</CardTitle>
                    <CardDescription>Manage images for other key pages.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                     <FormField control={methods.control} name="founderPortrait" render={() => (
                        <FormItem>
                            <FormLabel>Founder's Portrait (About Page)</FormLabel>
                            <FormControl><ImageUploader name="founderPortrait" initialImageUrl={settings.founderPortrait} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={methods.control} name="getInvolvedVolunteer" render={() => (
                        <FormItem>
                            <FormLabel>Volunteer Image (Get Involved Page)</FormLabel>
                            <FormControl><ImageUploader name="getInvolvedVolunteer" initialImageUrl={settings.getInvolvedVolunteer} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Program Page Images</CardTitle>
                    <CardDescription>Manage images for the "What We Do" section pages.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-12">
                    {/* Education */}
                    <div className="space-y-8 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">Education Program</h3>
                        <FormField control={methods.control} name="programEducationHero" render={() => (
                            <FormItem>
                                <FormLabel>Hero Image</FormLabel>
                                <FormControl><ImageUploader name="programEducationHero" initialImageUrl={settings.programEducationHero} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={methods.control} name="programEducationGallery1" render={() => (
                                <FormItem><FormLabel>Gallery 1</FormLabel><FormControl><ImageUploader name="programEducationGallery1" initialImageUrl={settings.programEducationGallery1} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={methods.control} name="programEducationGallery2" render={() => (
                                <FormItem><FormLabel>Gallery 2</FormLabel><FormControl><ImageUploader name="programEducationGallery2" initialImageUrl={settings.programEducationGallery2} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={methods.control} name="programEducationGallery3" render={() => (
                                <FormItem><FormLabel>Gallery 3</FormLabel><FormControl><ImageUploader name="programEducationGallery3" initialImageUrl={settings.programEducationGallery3} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                    {/* Healthcare */}
                    <div className="space-y-8 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">Healthcare Program</h3>
                        <FormField control={methods.control} name="programHealthcareHero" render={() => (
                            <FormItem><FormLabel>Hero Image</FormLabel><FormControl><ImageUploader name="programHealthcareHero" initialImageUrl={settings.programHealthcareHero} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={methods.control} name="programHealthcareGallery1" render={() => (
                                <FormItem><FormLabel>Gallery 1</FormLabel><FormControl><ImageUploader name="programHealthcareGallery1" initialImageUrl={settings.programHealthcareGallery1} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={methods.control} name="programHealthcareGallery2" render={() => (
                                <FormItem><FormLabel>Gallery 2</FormLabel><FormControl><ImageUploader name="programHealthcareGallery2" initialImageUrl={settings.programHealthcareGallery2} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={methods.control} name="programHealthcareGallery3" render={() => (
                                <FormItem><FormLabel>Gallery 3</FormLabel><FormControl><ImageUploader name="programHealthcareGallery3" initialImageUrl={settings.programHealthcareGallery3} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                     {/* Environment */}
                    <div className="space-y-8 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">Environment Program</h3>
                        <FormField control={methods.control} name="programEnvironmentHero" render={() => (
                            <FormItem><FormLabel>Hero Image</FormLabel><FormControl><ImageUploader name="programEnvironmentHero" initialImageUrl={settings.programEnvironmentHero} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={methods.control} name="programEnvironmentGallery1" render={() => (
                                <FormItem><FormLabel>Gallery 1</FormLabel><FormControl><ImageUploader name="programEnvironmentGallery1" initialImageUrl={settings.programEnvironmentGallery1} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={methods.control} name="programEnvironmentGallery2" render={() => (
                                <FormItem><FormLabel>Gallery 2</FormLabel><FormControl><ImageUploader name="programEnvironmentGallery2" initialImageUrl={settings.programEnvironmentGallery2} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={methods.control} name="programEnvironmentGallery3" render={() => (
                                <FormItem><FormLabel>Gallery 3</FormLabel><FormControl><ImageUploader name="programEnvironmentGallery3" initialImageUrl={settings.programEnvironmentGallery3} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                     {/* Livelihood */}
                    <div className="space-y-8 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">Livelihood Program</h3>
                        <FormField control={methods.control} name="programLivelihoodHero" render={() => (
                            <FormItem><FormLabel>Hero Image</FormLabel><FormControl><ImageUploader name="programLivelihoodHero" initialImageUrl={settings.programLivelihoodHero} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={methods.control} name="programLivelihoodGallery1" render={() => (
                                <FormItem><FormLabel>Gallery 1</FormLabel><FormControl><ImageUploader name="programLivelihoodGallery1" initialImageUrl={settings.programLivelihoodGallery1} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={methods.control} name="programLivelihoodGallery2" render={() => (
                                <FormItem><FormLabel>Gallery 2</FormLabel><FormControl><ImageUploader name="programLivelihoodGallery2" initialImageUrl={settings.programLivelihoodGallery2} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={methods.control} name="programLivelihoodGallery3" render={() => (
                                <FormItem><FormLabel>Gallery 3</FormLabel><FormControl><ImageUploader name="programLivelihoodGallery3" initialImageUrl={settings.programLivelihoodGallery3} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" disabled={methods.formState.isSubmitting} size="lg" className="w-full">
                {methods.formState.isSubmitting ? 'Saving...' : 'Save All Settings'}
            </Button>
        </form>
      </Form>
    </FormProvider>
  );
}

    