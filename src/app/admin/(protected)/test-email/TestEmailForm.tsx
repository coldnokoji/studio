
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { sendTestEmailAction } from './actions';
import { toast } from 'sonner';

export function TestEmailForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await sendTestEmailAction();
      if (result.success) {
        toast.success('Test Email Sent!', {
          description: `An email was sent to ${result.email}. Please check your inbox.`,
        });
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error: any) {
      toast.error('Failed to Send Email', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Sending...' : 'Send Test Email'}
    </Button>
  );
}
