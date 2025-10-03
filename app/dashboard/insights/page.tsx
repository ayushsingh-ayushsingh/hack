import DashboardLayout from "../dashboard-layout";
import FitnessForm from "./fitness-form";

export default function Page() {
    return (
        <DashboardLayout currentPath="Settings">
            <div className="p-4 max-w-md mx-auto w-full h-[80vh]">
                <div className="h-[80vh] items-center flex">
                    <FitnessForm />
                </div>
            </div>
        </DashboardLayout>
    )
}
