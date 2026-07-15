import {

    FaEdit,

    FaTrash

} from "react-icons/fa";

function AppointmentActions({

    cita,

    onEdit,

    onDelete

}) {

    return (

        <div className="appointmentActions">

            <button

                className="actionButton edit"

                onClick={() => onEdit(cita)}

                title="Editar"

            >

                <FaEdit/>

            </button>

            <button

                className="actionButton delete"

                onClick={() => onDelete(cita.id)}

                title="Eliminar"

            >

                <FaTrash/>

            </button>

        </div>

    );

}

export default AppointmentActions;