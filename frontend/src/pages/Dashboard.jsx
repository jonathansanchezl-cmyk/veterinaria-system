import MainLayout from "../components/layout/MainLayout";
import DashboardCards from "../components/dashboard/DashboardCards";
import AgendaHoy from "../components/dashboard/AgendaHoy";
import useDashboard from "../hooks/useDashboard";
import Loader from "../components/common/Loader";
import RecentPatients from "../components/dashboard/RecentPatients";
import SpeciesChart from "../components/dashboard/SpeciesChart";
import IncomeChart from "../components/dashboard/IncomeChart";




function Dashboard() {

    const {

        dashboard,

        loading

    } = useDashboard();

    if (loading) {

        return (

            <MainLayout>

                <Loader />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="pageHeader">

                <div>

                    <h1>

                        Dashboard

                    </h1>

                    <p>

                        Resumen general de la clínica veterinaria.

                    </p>

                </div>

            </div>

           <DashboardCards dashboard={dashboard} />

<div className="dashboardGrid">

    <div className="gridLarge">

        <AgendaHoy

            agenda={dashboard.agendaHoy}

        />

    </div>

    <div className="gridSmall">

        <IncomeChart

            ingresos={dashboard.ingresos}

        />

    </div>

    <div className="gridLarge">

        <RecentPatients

            mascotas={dashboard.ultimasMascotas}

        />

    </div>

    <div className="gridSmall">

        <SpeciesChart

            data={dashboard.especies}

        />

    </div>

    
</div>



        </MainLayout>

    );

}

export default Dashboard;