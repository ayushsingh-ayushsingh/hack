import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
    }

    try {
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        const payment = await razorpay.payments.fetch(id);

        return NextResponse.json(payment);
    } catch (err: any) {
        console.error(`GET /api/razorpay/payment/${id} error:`, err);
        return NextResponse.json({ error: "Error fetching payment", details: err?.message ?? err }, { status: 500 });
    }
}