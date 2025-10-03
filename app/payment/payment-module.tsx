'use client';

import Script from 'next/script';
import { useState } from 'react';
import PaymentButton from '@/components/payment-button';

const getPaymentDetails = async (paymentId: string) => {
    const res = await fetch(`/api/razorpay/payment/${paymentId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch payment details');
    }
    return res.json();
};

export default function PaymentModule({
    userEmail,
    userContact,
    userName
}: {
    userEmail: string,
    userContact: string,
    userName: string
}) {
    const [amount, setAmount] = useState<number>(100);
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [paymentDetails, setPaymentDetails] = useState<any>(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const handleGetDetails = async () => {
        if (!paymentId) {
            alert('Please complete a payment first.');
            return;
        }

        setLoadingDetails(true);
        try {
            const details = await getPaymentDetails(paymentId);
            setPaymentDetails(details);
        } catch (error) {
            console.error(error);
            alert('Error fetching payment details.');
            setPaymentDetails(null);
        } finally {
            setLoadingDetails(false);
        }
    };

    return (
        <div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Test Payment</h1>

                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount (in Rupees)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            min="1"
                        />
                    </div>

                    <PaymentButton
                        amount={amount}
                        name={userName}
                        email={userEmail}
                        contact={userContact}
                        onPaymentSuccess={(id: string) => setPaymentId(id)}
                    />

                    <button
                        onClick={handleGetDetails}
                        disabled={!paymentId || loadingDetails}
                        className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loadingDetails ? 'Fetching...' : 'Get Payment Details'}
                    </button>
                </div>

                {paymentDetails && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction Details</h2>
                        <pre className="overflow-x-auto p-4 bg-gray-50 rounded-md text-sm text-gray-700">
                            {JSON.stringify(paymentDetails, null, 2)}
                        </pre>
                    </div>
                )}
            </main>
        </div>
    );
}