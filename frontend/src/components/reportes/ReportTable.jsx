import {
    FileSpreadsheet,
    FileText
} from "lucide-react";

import {
    exportarExcel,
    exportarPDF
} from "../../services/reportesService";

function ReportTable({

    stats,

    loading

}) {

    const lista = [

        {
            id: 1,
            nombre: "Clientes",
            tipo: "CLIENTES",
            registros: stats?.clientes || 0,
            actualizado: "Hoy"
        },

        {
            id: 2,
            nombre: "Mascotas",
            tipo: "MASCOTAS",
            registros: stats?.mascotas || 0,
            actualizado: "Hoy"
        },

        {
            id: 3,
            nombre: "Citas",
            tipo: "CITAS",
            registros: stats?.citas || 0,
            actualizado: "Hoy"
        },

        {
            id: 4,
            nombre: "Veterinarios",
            tipo: "VETERINARIOS",
            registros: stats?.veterinarios || 0,
            actualizado: "Hoy"
        }

    ];

    // ======================================
    // EXPORTAR EXCEL
    // ======================================

    const handleExcel = async (tipo) => {

        try {

            await exportarExcel(tipo);

        }

        catch (error) {

            console.error(error);

            alert("Error exportando el reporte a Excel.");

        }

    };

    // ======================================
    // EXPORTAR PDF
    // ======================================

    const handlePDF = async (tipo) => {

        try {

            await exportarPDF(tipo);

        }

        catch (error) {

            console.error(error);

            alert("Error exportando el reporte a PDF.");

        }

    };

    return (

        <section className="reportTableCard">

            <div className="tableHeader">

                <h2>

                    Reportes Disponibles

                </h2>

            </div>

            {

                loading && (

                    <div className="loadingMessage">

                        Consultando información...

                    </div>

                )

            }

            <table className="reportTable">

                <thead>

                    <tr>

                        <th>Reporte</th>
                        <th>Registros</th>
                        <th>Última actualización</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        lista.map((reporte) => (

                            <tr key={reporte.id}>

                                <td>

                                    <strong>

                                        {reporte.nombre}

                                    </strong>

                                </td>

                                <td>

                                    {reporte.registros}

                                </td>

                                <td>

                                    {reporte.actualizado}

                                </td>

                                <td>

                                    <div className="actionButtons">

                                        <button

                                            className="btnExcel"

                                            title="Exportar Excel"

                                            onClick={() =>
                                                handleExcel(reporte.tipo)
                                            }

                                        >

                                            <FileSpreadsheet size={18} />

                                        </button>

                                        <button

                                            className="btnPdf"

                                            title="Exportar PDF"

                                            onClick={() =>
                                                handlePDF(reporte.tipo)
                                            }

                                        >

                                            <FileText size={18} />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </section>

    );

}

export default ReportTable;