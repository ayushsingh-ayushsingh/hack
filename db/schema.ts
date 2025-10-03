import {
    user as userTable,
    session as sessionTable,
    account as accountTable,
    verification as verificationTable
} from "./schemas/auth"

import {
    files as filesTable,
} from "./schemas/files"

import { payments as paymentsTable } from "./schemas/payments"

export const user = userTable;
export const session = sessionTable;
export const account = accountTable;
export const verification = verificationTable;

export const payments = paymentsTable;

export const files = filesTable;

export const schema = { user, session, account, verification, payments, files };