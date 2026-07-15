import AppointmentStatus from "./AppointmentStatus";
import AppointmentActions from "./AppointmentActions";

function AppointmentRow({

    cita,

    onEdit,

    onDelete

}) {

    return (

        <tr>

            <td>{cita.hora}</td>

            <td>{cita.mascota}</td>

            <td>{cita.propietario}</td>

            <td>{cita.doctor}</td>

            <td>

                {

                    new Date(cita.fecha)

                    .toLocaleDateString(

                    "es-PE"

                     )

                }

            </td>

            <td>

                <AppointmentStatus

                    estado={cita.estado}

                />

            </td>

            <td>

    {

        Number(cita.costo)

            .toLocaleString(

                "es-PE",

                {

                    style:"currency",

                    currency:"PEN"

                }

            )

    }

</td>

            <td>

                <AppointmentActions

                    cita={cita}

                    onEdit={onEdit}

                    onDelete={onDelete}

                />

            </td>

        </tr>

    );

}

export default AppointmentRow;
