import {

    FaUsers,

    FaPaw,

    FaCalendarAlt,

    FaUserMd,

    FaUserShield

} from "react-icons/fa";

import DashboardCard from "./DashboardCard";

function DashboardCards({

    dashboard

}) {

    return (

        <div className="dashboardCards">

            <DashboardCard

                titulo="Clientes"

                valor={dashboard.clientes}

                icono={<FaUsers/>}

                color="#2563EB"

            />

            <DashboardCard

                titulo="Mascotas"

                valor={dashboard.mascotas}

                icono={<FaPaw/>}

                color="#16A34A"

            />

            <DashboardCard

                titulo="Citas"

                valor={dashboard.citas}

                icono={<FaCalendarAlt/>}

                color="#EA580C"

            />

            <DashboardCard

                titulo="Veterinarios"

                valor={dashboard.veterinarios}

                icono={<FaUserMd/>}

                color="#9333EA"

            />

            <DashboardCard

                titulo="Usuarios"

                valor={dashboard.usuarios}

                icono={<FaUserShield/>}

                color="#DC2626"

            />

        </div>

    );

}

export default DashboardCards;
