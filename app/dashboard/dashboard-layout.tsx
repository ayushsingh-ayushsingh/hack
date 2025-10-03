import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import FeedbackDialog from "@/components/feedback-dialog";
import UserDropdown from "@/components/user-dropdown";
import { Separator } from "@/components/ui/separator";
import { RiScanLine } from "@remixicon/react";
import { ReactNode, Suspense } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Divide } from "lucide-react";

interface DashboardLayoutProps {
    children: ReactNode;
    currentPath: string;
}

const DashboardLayout = ({ children, currentPath }: DashboardLayoutProps) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink asChild>
                                        <Link href="/dashboard">
                                            <RiScanLine size={22} aria-hidden="true" />
                                            <span className="sr-only">Dashboard</span>
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{currentPath}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex gap-3 ml-auto">
                        <FeedbackDialog />
                        <UserDropdown />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;
