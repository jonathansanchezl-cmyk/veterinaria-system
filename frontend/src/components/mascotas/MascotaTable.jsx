import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import MascotaRow from "./MascotaRow";

function MascotaTable({

    mascotas,

    loading,

    onEditar,

    onEliminar

}) {

    if (loading) {

        return <Loader />;

    }

    if (!mascotas || mascotas.length === 0) {

        return (

            <EmptyState

                title="No existen mascotas"

                message="Presione 'Nueva Mascota' para registrar la primera."

            />

        );

    }

    return (

        <div className="tableContainer">

            <table className="appointmentTable">

                <thead>

                    <tr>

                        <th>Nombre</th>

                        <th>Propietario</th>

                        <th>Especie</th>

                        <th>Raza</th>

                        <th>Edad</th>

                        <th>Sexo</th>

                        <th>Estado</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        mascotas.map((mascota) => (

                            <MascotaRow

                                key={mascota.id}

                                mascota={mascota}

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

export default MascotaTable;
