import { FaEdit, FaTrash } from "react-icons/fa";

function VeterinarioRow({

    doctor,

    onEditar,

    onEliminar

}) {

    return (

        <tr>

            <td>{doctor.nombres}</td>

            <td>{doctor.especialidad}</td>

            <td>{doctor.telefono}</td>

            <td>{doctor.correo}</td>

            <td>{doctor.horario}</td>

            <td>

                <span className="status success">

                    {doctor.estado || "ACTIVO"}

                </span>

            </td>

            <td>

                <div className="appointmentActions">

                    <button

                        className="actionButton edit"

                        onClick={()=>onEditar(doctor)}

                    >

                        <FaEdit/>

                    </button>

                    <button

                        className="actionButton delete"

                        onClick={()=>onEliminar(doctor)}

                    >

                        <FaTrash/>

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default VeterinarioRow;