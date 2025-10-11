
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { TestEmailForm } from './TestEmailForm';

export default function TestEmailPage() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Test Donation Receipt Email</CardTitle>
        <CardDescription>
          Click the button below to send a sample donation receipt to your verified Resend email address. This is for previewing the email template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TestEmailForm />
      </CardContent>
    </Card>
  );
}
