import React from 'react'
import { Button } from "@/components/ui/button";
import { StatsGrid } from "@/components/stats-grid";
import { ChartCandlestick, CircleFadingPlus, Phone, UserRoundCheck } from "lucide-react";
import Table from "./table";

export default function Dashboard() {
    return (
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
    )
}
