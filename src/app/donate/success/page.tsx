'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DonateSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Redirect user to the main donate page with status parameters
        const txnid = searchParams.get('txnid');
        router.replace(`/donate?status=success&txnid=${txnid}`);
    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <CardTitle className="mt-4">Payment Successful!</CardTitle>
                    <CardDescription>Thank you for your generous donation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            Redirecting you now...
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
