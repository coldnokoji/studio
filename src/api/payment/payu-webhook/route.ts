// src/api/payment/payu-webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createDonation } from "@/services/firestore";
import { getDb } from "@/lib/firebase/admin"; // <--- FIX 1: Import getDb
import { verifyPayUHash } from "@/lib/payu";
import { sendDonationReceipt } from "@/services/email"; // <--- FIX 2: Use correct name
import { Donation } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const reqBody = Object.fromEntries(formData.entries());

    console.log("PayU Webhook received:", reqBody);
    // ... (rest of the fields)
    const {
      status,
      txnid,
      amount,
      email,
      firstname,
      productinfo,
      phone,
      udf1,
      udf2,
      mode,
      hash,
    } = reqBody as Record<string, string>;

    // 1. Verify the hash
    // const isHashValid = verifyPayUHash(reqBody, hash);
    // if (!isHashValid) {
    //   console.warn("PayU Webhook: Invalid hash received", txnid);
    //   return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
    // }

    if (status === "success") {
      const adminDb = await getDb(); // <--- FIX 3: Use getDb()
      const existingDonation = await adminDb
        .collection("donations")
        .doc(txnid)
        .get();

      if (existingDonation.exists) {
        console.log(`Donation ${txnid} already processed.`);
        return NextResponse.json({ message: "Already processed" });
      }

      const donationData: Omit<Donation, "id"> = {
        txnid: txnid,
        amount: Number(amount),
        email: email,
        name: firstname,
        status: "success" as const,
        isRecurring: reqBody.udf3 === "RECURRING_PAYMENT",
        phone: phone,
        address: udf1,
        pan: udf2,
        purpose: productinfo,
        donationDate: new Date().toISOString(),
        paymentMode: mode,
      };

      await createDonation(donationData);

      try {
        const fullDonation = { ...donationData, id: txnid } as Donation;
        await sendDonationReceipt(fullDonation); // <--- FIX 4: Use correct name
      } catch (emailError) {
        console.error(`Failed to send receipt email for ${txnid}:`, emailError);
      }
    } else {
      console.log(`Transaction failed for txnid: ${txnid} with status: ${status}`);
    }

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Error in PayU webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}