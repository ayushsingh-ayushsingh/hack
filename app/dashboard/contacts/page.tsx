import DashboardLayout from "../dashboard-layout";
import Contacts from "./contacts";

export default function ContactsPage() {
    return (
        <DashboardLayout currentPath="Contacts">
            <Contacts />
        </DashboardLayout>
    );
}
