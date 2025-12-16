import Navbar from "../components/navbar";
import ThemeLD from "../components/themeLD";
import DashboardCharts from "./_components/dashboardCharts";
import DashboardForm from "./_components/dashboardForm";
import DashboardTable from "./_components/dashboardTable"

export default function Dashboard(){
    return(
        <div>
            <Navbar />
            <DashboardForm />
            <DashboardTable />
            <DashboardCharts />
            <ThemeLD />
        </div>
    )
}