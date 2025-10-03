import LogoutButton from "@/components/layouts/logout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PaymentModule from "./payment-module";

export default async function Settings() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="flex gap-4 items-center justify-center h-[100vh]">
            <h1 className="text-lg">Welcome! {session.user.name}</h1>
            <LogoutButton />
            <PaymentModule userName={session.user.name} userEmail={session.user.email} userContact="999999999" />
        </div>
    )
}
