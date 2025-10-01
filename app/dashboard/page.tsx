import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experiment 01 Crafted.is",
};

import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/user-dropdown";
import FeedbackDialog from "@/components/feedback-dialog";
import { RiScanLine } from "@remixicon/react";
import { StatsGrid } from "@/components/stats-grid";
import { ChartCandlestick, CircleFadingPlus, Pen, Phone, UserRoundCheck } from "lucide-react";
import Table from "./table";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger className="-ms-4" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        <RiScanLine size={22} aria-hidden="true" />
                                        <span className="sr-only">Dashboard</span>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Contacts</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex gap-3 ml-auto">
                        <FeedbackDialog />
                        <UserDropdown />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
                    {/* Page intro */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-semibold">Oilà, Larry!</h1>
                            <p className="text-sm text-muted-foreground">
                                Here&rsquo;s an overview of your contacts. Manage or create new
                                ones with ease!
                            </p>
                        </div>
                        <Button className="px-3">Add Contact</Button>
                    </div>
                    {/* Numbers */}
                    <StatsGrid
                        stats={[
                            {
                                title: "Connections",
                                value: "427,296",
                                change: {
                                    value: "+12%",
                                    trend: "up",
                                },
                                icon: (
                                    <CircleFadingPlus />
                                ),
                            },
                            {
                                title: "Contacts",
                                value: "37,429",
                                change: {
                                    value: "+42%",
                                    trend: "up",
                                },
                                icon: (
                                    <Phone />
                                ),
                            },
                            {
                                title: "Value",
                                value: "$82,439",
                                change: {
                                    value: "+37%",
                                    trend: "up",
                                },
                                icon: (
                                    <ChartCandlestick />
                                ),
                            },
                            {
                                title: "Referrals",
                                value: "3,497",
                                change: {
                                    value: "-17%",
                                    trend: "down",
                                },
                                icon: (
                                    <UserRoundCheck />
                                ),
                            },
                        ]}
                    />
                    {/* Table */}
                    <div className="min-h-[100vh] flex-1 md:min-h-min">
                        <Table />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}