import { FaEdit, FaTrash } from "react-icons/fa";

function UsuarioRow({

    usuario,

    onEditar,

    onEliminar

}) {

    return (

        <tr>

            <td>

                {usuario.nombre}

            </td>

            <td>

                {usuario.usuario}

            </td>

            <td>

                {usuario.email}

            </td>

            <td>

                {usuario.rol}

            </td>

            <td>

                <span className="status success">

                    {usuario.estado}

                </span>

            </td>

            <td>

                <div className="appointmentActions">

                    <button

                        className="actionButton edit"

                        onClick={()=>onEditar(usuario)}

                    >

                        <FaEdit/>

                    </button>

                    <button

                        className="actionButton delete"

                        onClick={()=>onEliminar(usuario)}

                    >

                        <FaTrash/>

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default UsuarioRow;
