import React from 'react'
import { Button } from "@/components/ui/button";
import { StatsGrid } from "@/components/stats-grid";
import { ChartCandlestick, CircleFadingPlus, Phone, UserRoundCheck } from "lucide-react";
import Table from "./table";

export default function Contacts() {
    return (
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
            {/* Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
                <Table />
            </div>
        </div>
    )
}
