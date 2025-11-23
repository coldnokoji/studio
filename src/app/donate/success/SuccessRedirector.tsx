'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { saveDonation } from './actions';


export default function SuccessRedirector() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const txnid = searchParams.get('txnid');
        const name = searchParams.get('firstname');
        const email = searchParams.get('email');
        const amount = searchParams.get('amount');
        const status = searchParams.get('status');
        const isRecurring = searchParams.get('udf3') === 'RECURRING_PAYMENT';
        const address = searchParams.get('udf1');
        const pan = searchParams.get('udf2');

        // Save the donation details to Firestore
        if (status === 'success' && txnid && name && email && amount) {
            saveDonation({
                name,
                email,
                amount: parseFloat(amount),
                txnid,
                status: 'success',
                isRecurring,
                donationDate: new Date().toISOString(),
                ...(address && { address }),
                ...(pan && { pan }),
            });
        }

        // Redirect user to the main donate page with status parameters
        setTimeout(() => {
            const redirectParams = new URLSearchParams();
            redirectParams.set('status', 'success');
            if (txnid) redirectParams.set('txnid', txnid);
            router.replace(`/donate?${redirectParams.toString()}`);
        }, 1500); // 1.5-second delay
    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <CardTitle className="mt-4">Payment Successful!</CardTitle>
                    <CardDescription>Thank you for your generous donation. Saving details...</CardDescription>
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
