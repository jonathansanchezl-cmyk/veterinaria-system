import { PawPrint } from "lucide-react";

function RecentPatients({ mascotas = [] }) {

    return (

        <section className="dashboardCard recentPatientsCard">

            <div className="panelHeader">

                <h2>

                    <PawPrint
                        size={26}
                        color="#2563EB"
                    />

                    Últimas Mascotas Registradas

                </h2>

            </div>

            {

                mascotas.length === 0 ? (

                    <div className="emptyState">

                        No existen mascotas registradas.

                    </div>

                ) : (

                    <table className="dashboardTable">

                        <thead>

                            <tr>

                                <th>Mascota</th>

                                <th>Especie</th>

                                <th>Raza</th>

                                <th>Propietario</th>

                                <th>Edad</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                mascotas.map((mascota) => (

                                    <tr key={mascota.id}>

                                        <td>

                                            <strong>

                                                {mascota.nombre}

                                            </strong>

                                        </td>

                                        <td>

                                            {mascota.especie
                                                ? mascota.especie.charAt(0).toUpperCase() +
                                                  mascota.especie.slice(1)
                                                : "-"}

                                        </td>

                                        <td>

                                            {mascota.raza || "-"}

                                        </td>

                                        <td>

                                            {mascota.propietario || "-"}

                                        </td>

                                        <td>

                                            {mascota.edad} años

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )

            }

        </section>

    );

}

export default RecentPatients;