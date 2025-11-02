import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // --- UPDATED: Receive all new fields ---
    const { 
        name, 
        email, 
        amount, 
        isRecurring, 
        phone,        // NEW
        address,      // NEW
        pan,          // NEW
        purpose       // NEW
    } = await req.json();

    const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
    const PAYU_SALT = process.env.PAYU_SALT;
    const isProduction = process.env.NODE_ENV === 'production';
    
    const PAYU_BASE_URL = isProduction 
      ? 'https://secure.payu.in/_payment' 
      : 'https://test.payu.in/_payment';

    if (!PAYU_MERCHANT_KEY || !PAYU_SALT) {
        throw new Error("PayU credentials are not configured in environment variables.");
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (isProduction && !baseUrl) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured in environment variables for production.");
    }
    
    const appUrl = baseUrl || req.nextUrl.origin;
    const txnid = `TXN_${Date.now()}`;
    
    // --- UPDATED: Populate paymentData with new fields ---
    const paymentData: { [key: string]: string } = {
      key: PAYU_MERCHANT_KEY,
      txnid: txnid,
      amount: amount.toString(),
      productinfo: purpose, // Use 'purpose' from form
      firstname: name,
      email: email,
      phone: phone, // Use real 'phone' from form
      surl: `${appUrl}/donate/success`,
      furl: `${appUrl}/donate/failure`,
      service_provider: 'payu_paisa',
      udf1: address, // Use 'address' for udf1
      udf2: pan,     // Use 'pan' for udf2
      udf3: '',
      udf4: '',
      udf5: '',
    };
    
    if (isRecurring) {
        // Use udf3 for recurring flag
        paymentData['udf3'] = 'RECURRING_PAYMENT'; 
        paymentData['si'] = '1';
        paymentData['billing_amount'] = amount.toString();
        paymentData['billing_cycle'] = 'MONTHLY';
        paymentData['billing_interval'] = '1';
        paymentData['payment_start_date'] = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];
        paymentData['payment_end_date'] = '2099-12-31';
    }

    // --- CRITICAL UPDATE: The Hash String ---
    // The hash string MUST include the new fields in the correct order.
    // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|||||||salt)
    const hashStringParts = [
        paymentData.key,
        paymentData.txnid,
        paymentData.amount,
        paymentData.productinfo, // Now 'purpose'
        paymentData.firstname,
        paymentData.email,
        paymentData.udf1, // Now 'address'
        paymentData.udf2, // Now 'pan'
        paymentData.udf3, // Now 'RECURRING_PAYMENT' or ''
        paymentData.udf4,
        paymentData.udf5,
        '', // udf6
        '', // udf7
        '', // udf8
        '', // udf9
        '', // udf10
        PAYU_SALT, // The salt is always last
    ];

    const hashString = hashStringParts.join('|');
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    const payuFormData = {
        ...paymentData,
        hash: hash,
        action: PAYU_BASE_URL
    };

    return NextResponse.json(payuFormData);

  } catch (err: any) {
    console.error('PayU Integration Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}