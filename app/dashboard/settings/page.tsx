import LogoutButton from "@/components/layouts/logout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayout from "../dashboard-layout";
import EditProfile from "@/components/edit-profile";

export default async function Settings() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/login")
    }

    return (
        <DashboardLayout currentPath="Settings">
            <div className="w-full h-[80vh] flex flex-col items-center justify-center space-y-2">
                <h1 className="text-xl">Welcome! {session.user.name}</h1>
                <div className="space-x-2 flex">
                    <LogoutButton />
                    <EditProfile
                        imageURL={session.user.image}
                        userEmail={session.user.email}
                        userName={session.user.name}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}
