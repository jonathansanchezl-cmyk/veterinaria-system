import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

function Atencion() {

    const { id } = useParams();

    return (

        <MainLayout>

            <div className="pageContainer">

                <div className="pageHeader">

                    <h1>

                        Atención Médica

                    </h1>

                    <p>

                        Registro de atención de la cita #{id}

                    </p>

                </div>

                <div className="card">

                    <h2>

                        Información de la Cita

                    </h2>

                    <p>

                        Aquí se cargará la información del paciente.

                    </p>

                </div>

            </div>

        </MainLayout>

    );

}

export default Atencion;
