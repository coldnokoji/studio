import { NextRequest, NextResponse } from "next/server";
import { createDonation } from "@/services/firestore";
import { getDb } from "@/lib/firebase/admin";
import { verifyPayUHash } from "@/lib/payu";
import { sendDonationReceipt } from "@/services/email";
import { Donation } from "@/lib/types";

export async function POST(req: NextRequest) {
    try {
        let reqBody: Record<string, string> = {};
        try {
            const formData = await req.formData();
            reqBody = Object.fromEntries(formData.entries()) as Record<string, string>;
        } catch (e) {
            console.log("Failed to parse formData, trying json...", e);
            try {
                reqBody = await req.json();
            } catch (jsonError) {
                console.log("Failed to parse JSON, trying text...", jsonError);
                try {
                    const text = await req.text();
                    console.log("Raw Request Body:", text);
                    // If it's URL encoded string, we might want to parse it manually, but for now just log it.
                } catch (textError) {
                    console.error("Failed to read request body as text", textError);
                }
                return NextResponse.redirect(new URL('/donate/failure?error=InvalidRequestFormat', req.url), 303);
            }
        }

        // Log all keys received for debugging
        console.log("PayU Callback Keys:", Object.keys(reqBody));
        console.log("PayU Callback Status:", reqBody.status);
        console.log("PayU Callback TxnId:", reqBody.txnid);

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
            udf3,
            mode,
            hash,
            error_Message,
            mihpayid, // PayU's internal ID
        } = reqBody as Record<string, string>;

        if (!txnid) {
            console.error("PayU Callback Error: Missing txnid. Full Body:", JSON.stringify(reqBody));
            return NextResponse.redirect(new URL(`/donate/failure?error=MissingTxnId&payuId=${mihpayid || 'unknown'}`, req.url), 303);
        }

        // 1. Verify the hash
        const isHashValid = verifyPayUHash(reqBody, hash);
        if (!isHashValid) {
            console.warn("PayU Callback: Invalid hash received", txnid);
            return NextResponse.redirect(new URL(`/donate/failure?txnid=${txnid}&error=InvalidHash`, req.url), 303);
        }

        if (status === "success") {
            const adminDb = await getDb();
            const existingDonation = await adminDb
                .collection("donations")
                .doc(txnid)
                .get();

            if (existingDonation.exists) {
                console.log(`Donation ${txnid} already processed.`);
                // Already processed, just redirect to success
                return NextResponse.redirect(new URL(`/donate/success?txnid=${txnid}&status=success&firstname=${firstname}&email=${email}&amount=${amount}`, req.url), 303);
            }

            const donationData: Omit<Donation, "id"> = {
                txnid: txnid,
                amount: Number(amount),
                email: email,
                name: firstname,
                status: "success" as const,
                isRecurring: udf3 === "RECURRING_PAYMENT", // We set this in the payment route
                phone: phone,
                address: udf1, // We mapped address to udf1
                pan: udf2,     // We mapped pan to udf2
                purpose: productinfo,
                donationDate: new Date().toISOString(),
                paymentMode: mode,
            };

            // Save to Firestore
            await createDonation(donationData);

            // Send Email
            try {
                const fullDonation = { ...donationData, id: txnid } as Donation;
                await sendDonationReceipt(fullDonation);
            } catch (emailError) {
                console.error(`Failed to send receipt email for ${txnid}:`, emailError);
                // Continue to redirect even if email fails
            }

            // Redirect to success page
            // We pass params so the client page can display them if needed, though it should ideally fetch from DB or just show success.
            const successUrl = new URL('/donate/success', req.url);
            successUrl.searchParams.set('txnid', txnid);
            successUrl.searchParams.set('status', 'success');
            successUrl.searchParams.set('firstname', firstname);
            successUrl.searchParams.set('email', email);
            successUrl.searchParams.set('amount', amount);

            return NextResponse.redirect(successUrl, 303);

        } else {
            console.log(`Transaction failed for txnid: ${txnid} with status: ${status}`);
            // Redirect to failure page
            const failureUrl = new URL('/donate/failure', req.url);
            failureUrl.searchParams.set('txnid', txnid);
            failureUrl.searchParams.set('status', 'failure');
            failureUrl.searchParams.set('error', error_Message || 'Transaction Failed');

            return NextResponse.redirect(failureUrl, 303);
        }

    } catch (error: any) {
        console.error("Error in PayU callback:", error);
        // In case of server error, redirect to failure with the specific error message
        const errorMessage = encodeURIComponent(error.message || "UnknownError");
        return NextResponse.redirect(new URL(`/donate/failure?error=InternalServerError:${errorMessage}`, req.url), 303);
    }
}
