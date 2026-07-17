import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

import AppointmentRow from "./AppointmentRow";

function AppointmentTable({

    citas,

    loading,

    onEdit,

    onDelete,

    onAttend

}) {

    if (loading) {

        return <Loader />;

    }

    if (!citas || citas.length === 0) {

        return (

            <EmptyState

                title="No hay citas registradas"

                message="Presione 'Nueva Cita' para registrar la primera."

            />

        );

    }

    return (

        <div className="tableContainer">

            <table className="appointmentTable">

                <thead>

                    <tr>

                        <th>Hora</th>

                        <th>Mascota</th>

                        <th>Propietario</th>

                        <th>Veterinario</th>

                        <th>Fecha</th>

                        <th>Estado</th>

                        <th>Costo</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        citas.map((cita) => (

                            <AppointmentRow

                                key={cita.id}

                                cita={cita}

                                onEdit={onEdit}

                                onDelete={onDelete}

                                onAttend={onAttend}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AppointmentTable;
