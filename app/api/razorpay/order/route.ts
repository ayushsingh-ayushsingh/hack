import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
    const body = await request.json();
    const { amount } = body;

    if (!amount || typeof amount !== 'number') {
        return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 });
    }

    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        return NextResponse.json(order);
    } catch (err) {
        console.error('Order creation failed:', err);
        return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
    }
}