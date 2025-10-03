// db/schema.ts
import { pgTable, text, timestamp, numeric, boolean } from 'drizzle-orm/pg-core';

export const payments = pgTable('payments', {
    id: text('id').primaryKey(), // Razorpay payment ID
    orderId: text('order_id').notNull(), // Razorpay order ID
    amount: numeric('amount').notNull(),
    currency: text('currency').notNull(),
    status: text('status').notNull(), // e.g., 'captured', 'authorized'
    signature: text('signature').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    isVerified: boolean('is_verified').default(false),
});