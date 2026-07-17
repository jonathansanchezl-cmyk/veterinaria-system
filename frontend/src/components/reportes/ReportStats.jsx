import {

    Users,

    PawPrint,

    CalendarDays,

    Stethoscope

} from "lucide-react";

import ReportCard from "./ReportCard";

function ReportStats({ stats }) {

    return (

        <div className="reportStatsGrid">

            <ReportCard

                title="Clientes"

                value={stats.clientes}

                color="#2563EB"

                icon={<Users size={28}/>}

            />

            <ReportCard

                title="Mascotas"

                value={stats.mascotas}

                color="#22C55E"

                icon={<PawPrint size={28}/>}

            />

            <ReportCard

                title="Citas"

                value={stats.citas}

                color="#F97316"

                icon={<CalendarDays size={28}/>}

            />

            <ReportCard

                title="Veterinarios"

                value={stats.veterinarios}

                color="#9333EA"

                icon={<Stethoscope size={28}/>}

            />

        </div>

    );

}

export default ReportStats;
