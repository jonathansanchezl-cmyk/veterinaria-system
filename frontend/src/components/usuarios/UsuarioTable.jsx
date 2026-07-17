import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import UsuarioRow from "./UsuarioRow";

function UsuarioTable({

    usuarios,

    loading,

    onEditar,

    onEliminar

}) {

    if (loading) {

        return <Loader />;

    }

    if (!usuarios.length) {

        return (

            <EmptyState

                title="No existen usuarios"

                message="Presione 'Nuevo Usuario' para registrar el primero."

            />

        );

    }

    return (

        <div className="tableContainer">

            <table className="appointmentTable">

                <thead>

                    <tr>

                        <th>Nombre</th>

                        <th>Usuario</th>

                        <th>Correo</th>

                        <th>Rol</th>

                        <th>Estado</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        usuarios.map((usuario)=>(

                            <UsuarioRow

                                key={usuario.id}

                                usuario={usuario}

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

export default UsuarioTable;
