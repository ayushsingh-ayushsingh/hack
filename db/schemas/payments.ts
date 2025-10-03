import { pgTable, text, timestamp, numeric, boolean } from 'drizzle-orm/pg-core';

export const payments = pgTable('payments', {
    id: text('id').primaryKey(),
    orderId: text('order_id').notNull(),
    amount: numeric('amount').notNull(),
    currency: text('currency').notNull(),
    status: text('status').notNull(),
    signature: text('signature').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    isVerified: boolean('is_verified').default(false),
});