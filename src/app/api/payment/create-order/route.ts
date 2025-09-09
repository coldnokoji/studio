import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { randomBytes } from 'crypto';

// This is your server-side route to create a payment order with Razorpay.
// It should be kept secure and only accessed from your frontend.

export async function POST(request: Request) {
  const { amount } = await request.json();

  // IMPORTANT: Never expose your key_secret in client-side code.
  // These should be stored in your environment variables.
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return NextResponse.json(
      { error: 'Razorpay API keys are not configured.' },
      { status: 500 }
    );
  }

  const razorpay = new Razorpay({
    key_id,
    key_secret,
  });

  // Razorpay order options
  const options = {
    amount, // amount in the smallest currency unit (e.g., paise for INR)
    currency: 'INR',
    receipt: `receipt_order_${randomBytes(4).toString('hex')}`, // a unique receipt ID
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Something went wrong while creating the order.' },
      { status: 500 }
    );
  }
}
