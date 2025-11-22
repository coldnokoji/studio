
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// This is the main server-side route to handle PayU integration.
export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, isRecurring, phone, address, pan, purpose } = await req.json();

    // --- IMPORTANT: Get these from your PayU account and add to .env.local ---
    const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
    const PAYU_SALT = process.env.PAYU_SALT;

    // Determine which PayU URL to use (test or production)
    const PAYU_BASE_URL = process.env.NODE_ENV === 'production'
      ? 'https://secure.payu.in/_payment'
      : 'https://test.payu.in/_payment';

    if (!PAYU_MERCHANT_KEY || !PAYU_SALT) {
      throw new Error("PayU credentials are not configured in environment variables.");
    }

    // Generate a unique transaction ID
    const txnid = `TXN_${Date.now()}`;

    // Use the ngrok URL for callbacks in development, otherwise use the request's origin
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;

    // The base data that will be sent to PayU
    const paymentData: { [key: string]: string } = {
      key: PAYU_MERCHANT_KEY,
      txnid: txnid,
      amount: amount.toString(),
      productinfo: purpose || (isRecurring ? 'Monthly Donation to Shreyaskar Foundation' : 'Donation to Shreyaskar Foundation'),
      firstname: name,
      email: email,
      phone: phone || '9999999999', // Use provided phone or dummy
      surl: `${baseUrl}/api/payment/payu/callback`, // Success URL - POST to API route
      furl: `${baseUrl}/api/payment/payu/callback`, // Failure URL - POST to API route
      service_provider: 'payu_paisa',
      udf1: address || '', // Map address to udf1
      udf2: pan || '',     // Map pan to udf2
      udf3: '',
      udf4: '',
      udf5: '',
    };

    // Add recurring payment parameters if selected
    if (isRecurring) {
      paymentData['udf3'] = 'RECURRING_PAYMENT'; // Store recurring flag in udf3
      // These are standard PayU parameters to enable SI/recurring payments
      paymentData['si'] = '1';
      paymentData['billing_amount'] = amount.toString();
      paymentData['billing_cycle'] = 'MONTHLY'; // Or 'YEARLY', 'WEEKLY', 'DAILY'
      paymentData['billing_interval'] = '1';
      paymentData['payment_start_date'] = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]; // Start next month
      paymentData['payment_end_date'] = '2099-12-31'; // A far-future date
    }

    // --- HASH GENERATION ---
    // The hash string must be in a specific order, as dictated by PayU's error logs.
    // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt)
    const hashStringParts = [
      paymentData.key,
      paymentData.txnid,
      paymentData.amount,
      paymentData.productinfo,
      paymentData.firstname,
      paymentData.email,
      paymentData.udf1 || '',
      paymentData.udf2 || '',
      paymentData.udf3 || '',
      paymentData.udf4 || '',
      paymentData.udf5 || '',
      '', // udf6
      '', // udf7
      '', // udf8
      '', // udf9
      '', // udf10
      PAYU_SALT, // The salt is always last
    ];

    const hashString = hashStringParts.join('|');
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    // Combine all data for the form
    const payuFormData = {
      ...paymentData,
      hash: hash,
      action: PAYU_BASE_URL
    };

    // Send the data back to the client to be submitted
    return NextResponse.json(payuFormData);

  } catch (err: any) {
    console.error('PayU Integration Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
