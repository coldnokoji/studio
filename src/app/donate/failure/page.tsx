// 'use client';
// import { useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { XCircle, Loader2 } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// export default function DonateFailurePage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     useEffect(() => {
//         // Redirect user to the main donate page with status parameters
//         const txnid = searchParams.get('txnid');
//         router.replace(`/donate?status=failure&txnid=${txnid}`);
//     }, [router, searchParams]);

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-muted/40">
//             <Card className="w-full max-w-md text-center">
//                 <CardHeader>
//                     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
//                         <XCircle className="h-10 w-10" />
//                     </div>
//                     <CardTitle className="mt-4">Payment Failed</CardTitle>
//                     <CardDescription>Unfortunately, the payment could not be processed.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex flex-col items-center gap-4">
//                         <Loader2 className="animate-spin text-muted-foreground" />
//                         <p className="text-sm text-muted-foreground">
//                            Redirecting you now...
//                         </p>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }


import { Suspense } from 'react';
import FailureRedirector from './FailureRedirector';

// This is a Server Component
export default function DonateFailurePage() {
  return (
    // The Suspense boundary tells Next.js how to handle the client component during build
    <Suspense fallback={<p>Loading payment status...</p>}>
      <FailureRedirector />
    </Suspense>
  );
}