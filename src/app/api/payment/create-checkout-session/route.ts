'use server';

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  const { amount, recurring, email, name } = await req.json();
  const YOUR_DOMAIN = req.nextUrl.origin;

  if (!amount || amount < 50) {
    return NextResponse.json({ error: 'Invalid donation amount. Must be at least INR 50.' }, { status: 400 });
  }

  try {
    let session;
    if (recurring) {
      // Create a product for the subscription if it doesn't exist
       const price = await stripe.prices.create({
        currency: 'inr',
        unit_amount: amount * 100, // Amount in paise
        recurring: {
          interval: 'month',
        },
        product_data: {
          name: 'Monthly Donation',
        },
      });

      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: price.id,
          quantity: 1,
        }],
        mode: 'subscription',
        customer_email: email,
        success_url: `${YOUR_DOMAIN}/donate?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}/donate?status=cancelled`,
        metadata: {
          donor_name: name,
        },
      });
    } else {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'upi'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'One-Time Donation',
              },
              unit_amount: amount * 100, // Amount in paise
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: email,
        success_url: `${YOUR_DOMAIN}/donate?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}/donate?status=cancelled`,
         metadata: {
          donor_name: name,
        },
      });
    }

    if (session.url) {
      return NextResponse.json({ redirectUrl: session.url });
    } else {
      throw new Error('Could not create Stripe Checkout session');
    }
  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
