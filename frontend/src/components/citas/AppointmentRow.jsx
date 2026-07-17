import AppointmentStatus from "./AppointmentStatus";
import AppointmentActions from "./AppointmentActions";

function formatearFecha(fecha) {

    if (!fecha) return "";

    const [anio, mes, dia] = fecha.split("-");

    return `${dia}/${mes}/${anio}`;

}

function AppointmentRow({

    cita,

    onEdit,

    onDelete,

    onAttend

}) {

    return (

        <tr>

            <td>{cita.hora}</td>

            <td>{cita.mascota}</td>

            <td>{cita.propietario}</td>

            <td>{cita.doctor}</td>

            <td>

                {formatearFecha(cita.fecha)}

            </td>

            <td>

                <AppointmentStatus
                    estado={cita.estado}
                />

            </td>

            <td>

                {

                    Number(cita.costo).toLocaleString(

                        "es-PE",

                        {

                            style: "currency",

                            currency: "PEN"

                        }

                    )

                }

            </td>

            <td>

                <AppointmentActions

                    cita={cita}

                    onEdit={onEdit}

                    onDelete={onDelete}

                    onAttend={onAttend}

                />

            </td>

        </tr>

    );

}

export default AppointmentRow;