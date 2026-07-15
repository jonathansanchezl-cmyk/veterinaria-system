import MainLayout from "../components/layout/MainLayout";
import DashboardCards from "../components/dashboard/DashboardCards";
import AgendaHoy from "../components/dashboard/AgendaHoy";
import UpcomingAppointments from "../components/dashboard/UpcomingAppointments";
import VeterinarianChart from "../components/dashboard/VeterinarianChart";
import SpeciesChart from "../components/dashboard/SpeciesChart";
import IncomeChart from "../components/dashboard/IncomeChart";
import RecentPatients from "../components/dashboard/RecentPatients";


function Dashboard() {

    return (

    <MainLayout>

    <div className="dashboardContainer">

        <DashboardCards/>

        <section className="dashboardPremium">

            <AgendaHoy/>

            <UpcomingAppointments/>

            <IncomeChart/>

            <VeterinarianChart/>

            <SpeciesChart/>

            <RecentPatients/>

        </section>

    </div>

</MainLayout>


    );

}

export default Dashboard;