import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DonationForm } from './donation-form';

export default function NewManualDonationPage() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Add Manual Donation</CardTitle>
        <CardDescription>
          Create a donation record manually. This is useful for testing or for logging offline donations. This will not trigger a real payment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DonationForm />
      </CardContent>
    </Card>
  );
}
