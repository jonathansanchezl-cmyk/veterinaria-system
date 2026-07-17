import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import VeterinarioRow from "./VeterinarioRow";

function VeterinarioTable({

    doctores,

    loading,

    onEditar,

    onEliminar

}) {

    if (loading) {

        return <Loader />;

    }

    if (!doctores.length) {

        return (

            <EmptyState

                title="No existen veterinarios"

                message="Presione 'Nuevo Veterinario' para registrar el primero."

            />

        );

    }

    return (

        <div className="tableContainer">

            <table className="appointmentTable">

                <thead>

                    <tr>

                        <th>Nombre</th>

                        <th>Especialidad</th>

                        <th>Teléfono</th>

                        <th>Correo</th>

                        <th>Horario</th>

                        <th>Estado</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        doctores.map((doctor)=>(

                            <VeterinarioRow

                                key={doctor.id}

                                doctor={doctor}

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

export default VeterinarioTable;
