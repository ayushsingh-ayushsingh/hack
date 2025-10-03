// app/api/razorpay/verify/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { db } from '@/db/drizzle';
import { payments } from '@/db/schema';
import crypto from 'crypto';

export async function POST(request: Request) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Create the expected signature using HMAC-SHA256
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest('hex');

    // Compare the signatures
    if (expectedSignature === razorpay_signature) {
        try {
            // Re-fetch payment details from Razorpay to ensure data integrity
            const razorpay = new Razorpay({
                key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                key_secret: process.env.RAZORPAY_KEY_SECRET!,
            });

            const payment = await razorpay.payments.fetch(razorpay_payment_id);

            // Save the payment details to your Drizzle database
            await db.insert(payments).values({
                id: payment.id,
                orderId: payment.order_id,
                amount: payment.amount.toString(), // Convert number to string for 'numeric' type
                currency: payment.currency,
                status: payment.status,
                signature: razorpay_signature,
                isVerified: true,
            });

            return NextResponse.json({ success: true, message: 'Payment verified and saved!' });
        } catch (error) {
            console.error('Payment verification or save failed:', error);
            return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }
}