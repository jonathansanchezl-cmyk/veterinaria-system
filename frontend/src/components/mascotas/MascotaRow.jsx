import { FaEdit, FaTrash } from "react-icons/fa";

function MascotaRow({

    mascota,

    onEditar,

    onEliminar

}) {

    console.log(mascota);
    
    return (

        <tr>

            <td>{mascota.nombre}</td>

            <td>{mascota.propietario}</td>

            <td>{mascota.especie}</td>

            <td>{mascota.raza}</td>

            <td>{mascota.edad}</td>

            <td>{mascota.sexo}</td>

            <td>

                <span className="status success">

                    {mascota.estado}

                </span>

            </td>

            <td>

                <div className="appointmentActions">

                    <button

                        className="actionButton edit"

                        onClick={() => onEditar(mascota)}

                    >

                        <FaEdit />

                    </button>

                    <button

                        className="actionButton delete"

                        onClick={() => onEliminar(mascota)}

                    >

                        <FaTrash />

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default MascotaRow;
