import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// This is the main server-side route to handle PayU integration.
export async function POST(req: NextRequest) {
  try {
    const { name, email, amount } = await req.json();

    // --- IMPORTANT: Get these from your PayU account and add to .env.local ---
    const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
    const PAYU_SALT = process.env.PAYU_SALT;
    const PAYU_AUTH_HEADER = process.env.PAYU_AUTH_HEADER; // For seamless integration if needed
    
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
    
    // The data that will be sent to PayU
    const paymentData = {
      key: PAYU_MERCHANT_KEY,
      txnid: txnid,
      amount: amount.toString(),
      productinfo: 'Donation to Shreyaskar Foundation',
      firstname: name,
      email: email,
      phone: '9999999999', // A dummy phone number, PayU requires one.
      surl: `${baseUrl}/donate/success?txnid=${txnid}`, // Success URL
      furl: `${baseUrl}/donate/failure?txnid=${txnid}`, // Failure URL
      service_provider: 'payu_paisa',
    };

    // --- HASH GENERATION ---
    // This is the specific string format PayU requires for hash calculation
    const hashString = [
        paymentData.key,
        paymentData.txnid,
        paymentData.amount,
        paymentData.productinfo,
        paymentData.firstname,
        paymentData.email,
        '', // udf1
        '', // udf2
        '', // udf3
        '', // udf4
        '', // udf5
        '', // udf6
        '', // udf7
        '', // udf8
        '', // udf9
        '', // udf10
        PAYU_SALT
    ].join('|');

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
