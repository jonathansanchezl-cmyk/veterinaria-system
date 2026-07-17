import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import ClienteRow from "./ClienteRow";

function ClienteTable({

    clientes,

    loading,

    onEditar,

    onEliminar

}) {

    if (loading) {

        return <Loader />;

    }

    if (!clientes || clientes.length === 0) {

        return (

            <EmptyState

                title="No existen clientes"

                message="Presione 'Nuevo Cliente' para registrar el primero."

            />

        );

    }

    return (

        <div className="tableContainer">

            <table className="appointmentTable">

                <thead>

                    <tr>

                        <th>Nombre</th>

                        <th>DNI</th>

                        <th>Teléfono</th>

                        <th>Correo</th>

                        <th>Dirección</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        clientes.map(cliente => (

                            <ClienteRow

                                key={cliente.id}

                                cliente={cliente}

                                onEditar={onEditar}

                                onEliminar={onEliminar}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ClienteTable;
