import {
    FaCalendarAlt,
    FaPaw,
    FaStethoscope,
    FaClipboardList,
    FaDollarSign
} from "react-icons/fa";

import DashboardCard from "./DashboardCard";

function DashboardCards() {

    return (

        <section className="dashboardCards">

            <DashboardCard
                icon={<FaCalendarAlt />}
                title="Citas de Hoy"
                value="24"
                trend="12% vs ayer"
                color="#22C55E"
            />

            <DashboardCard
                icon={<FaPaw />}
                title="Mascotas"
                value="152"
                trend="8% este mes"
                color="#3B82F6"
            />

            <DashboardCard
                icon={<FaStethoscope />}
                title="Veterinarios"
                value="8"
                trend="2 disponibles"
                color="#7C3AED"
            />

            <DashboardCard
                icon={<FaClipboardList />}
                title="Pendientes"
                value="3"
                trend="Requieren atención"
                color="#F59E0B"
            />

            <DashboardCard
                icon={<FaDollarSign />}
                title="Ingresos"
                value="S/. 850"
                trend="15% vs ayer"
                color="#10B981"
            />

        </section>

    );

}

export default DashboardCards;