import { useEffect, useState } from "react";
import { obtenerDashboard } from "../services/dashboardService";

function useDashboard() {

    const [dashboard, setDashboard] = useState({

        clientes: 0,

        mascotas: 0,

        veterinarios: 0,

        usuarios: 0,

        citas: 0,

        agendaHoy: [],

        ultimasMascotas: [],

        especies: [],

        citasPorVeterinario: [],

        ingresos: []

    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const cargarDashboard = async () => {

        try {

            setLoading(true);

            setError(null);

            const data = await obtenerDashboard();

            setDashboard({

                clientes: data.clientes ?? 0,

                mascotas: data.mascotas ?? 0,

                veterinarios: data.veterinarios ?? 0,

                usuarios: data.usuarios ?? 0,

                citas: data.citas ?? 0,

                agendaHoy: data.agendaHoy ?? [],

                ultimasMascotas: data.ultimasMascotas ?? [],

                especies: data.especies ?? [],

                citasPorVeterinario: data.citasPorVeterinario ?? [],

                ingresos: data.ingresos ?? []

            });

        }

        catch (err) {

            console.error("Error cargando dashboard:", err);

            setError(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        cargarDashboard();

    }, []);

    return {

        dashboard,

        loading,

        error,

        recargarDashboard: cargarDashboard

    };

}

export default useDashboard;
