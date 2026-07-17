import { FaEdit, FaTrash } from "react-icons/fa";

function ClienteRow({

    cliente,

    onEditar,

    onEliminar

}) {

    return (

        <tr>

            <td>

                {cliente.nombre}

            </td>

            <td>

                {cliente.dni}

            </td>

            <td>

                {cliente.telefono}

            </td>

            <td>

                {cliente.email}

            </td>

            <td>

                {cliente.direccion}

            </td>

            <td>

                <div className="appointmentActions">

                    <button

                        className="actionButton edit"

                        onClick={() =>

                            onEditar(cliente)

                        }

                    >

                        <FaEdit/>

                    </button>

                    <button

                        className="actionButton delete"

                        onClick={() =>

                            onEliminar(cliente)

                        }

                    >

                        <FaTrash/>

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default ClienteRow;
