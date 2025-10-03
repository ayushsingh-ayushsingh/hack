import DashboardLayout from "./dashboard-layout";
import Dashboard from "./dashboard";

export default function Page() {
    return (
        <DashboardLayout currentPath="Dashboard">
            <Dashboard />
        </DashboardLayout>
    );
}
