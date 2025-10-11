
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { saveDonation } from '@/services/firestore';
import { sendDonationReceipt } from '@/services/email';
import type { Donation } from '@/lib/types';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());

  const PAYU_SALT = process.env.PAYU_SALT;
  if (!PAYU_SALT) {
    console.error('PayU salt is not configured.');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  // --- HASH VERIFICATION ---
  // The hash string for the response is calculated in a different order.
  // The order is: salt|status||||||udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
  // We use our own salt, not the one PayU might send back.
  const hashString = PAYU_SALT + '|' + data.status + '||||||||||' + data.udf5 + '|' + data.udf4 + '|' + data.udf3 + '|' + data.udf2 + '|' + data.udf1 + '|' + data.email + '|' + data.firstname + '|' + data.productinfo + '|' + data.amount + '|' + data.txnid + '|' + process.env.PAYU_MERCHANT_KEY;

  const reverseHash = crypto.createHash('sha512').update(hashString).digest('hex');
  
  if (reverseHash !== data.hash) {
    console.warn('PayU webhook hash mismatch.', { received: data.hash, calculated: reverseHash, receivedString: data.hash_string });
     // It's critical to return a 400 error if the hash doesn't match to prevent fraudulent webhook calls.
     return NextResponse.json({ error: 'Hash mismatch' }, { status: 400 });
  }

  if (data.status === 'success') {
    try {
      const donationData: Omit<Donation, 'id' | 'createdAt'> = {
        name: data.firstname as string,
        email: data.email as string,
        amount: parseFloat(data.amount as string),
        txnid: data.txnid as string,
        status: 'success',
        isRecurring: data.udf1 === 'RECURRING_PAYMENT',
      };
      
      const newDonationId = await saveDonation(donationData);
      console.log(`Successfully saved donation for txnid: ${data.txnid}`);

      // Now send the email receipt
      const fullDonationRecord: Donation = {
        ...donationData,
        id: newDonationId,
        createdAt: new Date().toISOString(),
      };
      await sendDonationReceipt(fullDonationRecord);

    } catch (error) {
      console.error(`Failed to process webhook for txnid: ${data.txnid}`, error);
      // Even if saving fails, we must return a 200 to PayU to prevent retries.
    }
  } else {
     console.log(`Received non-success status '${data.status}' for txnid: ${data.txnid}`);
  }

  // Always return a 200 OK response to PayU to acknowledge receipt of the webhook.
  return NextResponse.json({ status: 'received' });
}
