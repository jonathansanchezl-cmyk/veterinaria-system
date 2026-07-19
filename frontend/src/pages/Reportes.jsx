import { useEffect, useState } from "react";
import { FileBarChart2 } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import ReportStats from "../components/reportes/ReportStats";
import ReportFilters from "../components/reportes/ReportFilters";
import ReportTable from "../components/reportes/ReportTable";

import api from "../services/api";
import { obtenerReporte } from "../services/reportesService";

function Reportes() {

    const [stats, setStats] = useState({

        clientes: 0,
        mascotas: 0,
        citas: 0,
        veterinarios: 0

    });

    const [reportes, setReportes] = useState([]);

    const [loading, setLoading] = useState(false);

    // ======================================
    // CARGAR RESUMEN DEL DASHBOARD
    // ======================================

    useEffect(() => {

        cargarResumen();

    }, []);

    const cargarResumen = async () => {

        try {

            const { data } = await api.get("/dashboard");

            setStats({

                clientes: data.clientes || 0,
                mascotas: data.mascotas || 0,
                citas: data.citas || 0,
                veterinarios: data.veterinarios || 0

            });

        } catch (error) {

            console.error(error);

        }

    };

    // ======================================
    // BUSCAR REPORTE
    // ======================================

    const buscar = async (filtros) => {

        try {

            setLoading(true);

            const respuesta = await obtenerReporte(filtros);

            const total = respuesta.total || 0;

            setReportes(respuesta.registros || []);

            setStats((prev) => {

                const nuevo = { ...prev };

                switch ((filtros.tipo || "").toUpperCase()) {

                    case "CLIENTES":
                        nuevo.clientes = total;
                        break;

                    case "MASCOTAS":
                        nuevo.mascotas = total;
                        break;

                    case "CITAS":
                        nuevo.citas = total;
                        break;

                    case "VETERINARIOS":
                        nuevo.veterinarios = total;
                        break;

                    default:
                        break;

                }

                return nuevo;

            });

        } catch (error) {

            console.error(error);

            setReportes([]);

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // LIMPIAR
    // ======================================

    const limpiar = () => {

        setReportes([]);

        cargarResumen();

    };

    return (

        <MainLayout>

            <div className="pageHeader">

                <div>

                    <h1>

                        <FileBarChart2 size={28} />

                        {" "}Reportes

                    </h1>

                    <p>

                        Genere y exporte reportes del sistema veterinario.

                    </p>

                </div>

            </div>

            <div className="reportPage">

                <ReportStats

                    stats={stats}

                />

                <ReportFilters

                    onSearch={buscar}

                    onClear={limpiar}

                />

                <ReportTable

                    stats={stats}
                    reportes={reportes}
                    loading={loading}

                />

            </div>

        </MainLayout>

    );

}

export default Reportes;
