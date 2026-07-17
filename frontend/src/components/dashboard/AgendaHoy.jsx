import {
    CalendarDays,
    Clock,
    PawPrint
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function AgendaHoy({ agenda = [] }) {

    const navigate = useNavigate();

    const proximaCita =

        agenda.find(
            cita =>
                cita.estado?.toUpperCase() === "CONFIRMADA"
        ) ||

        agenda[0];

    return (

        <section className="agendaPanel">

            <div className="panelHeader">

                <div>

                    <h2>

                        <CalendarDays size={26} />

                        Próxima Cita

                    </h2>

                    <p className="panelSubtitle">

                        {

                            proximaCita

                                ? "Cita programada"

                                : "No existen citas programadas"

                        }

                    </p>

                </div>

                <button

                    className="btnPrimary"

                    onClick={() => navigate("/citas")}

                >

                    Ir a Citas →

                </button>

            </div>

            {

                !proximaCita ? (

                    <div className="emptyState">

                        No existen citas confirmadas para hoy.

                    </div>

                ) : (

                    <div className="agendaList">

                        <div className="agendaItem">

                        <div className="agendaHour">

    <div className="agendaDate">

        <CalendarDays size={18} />

        <span>

            {proximaCita.fecha}

        </span>

    </div>

    <div className="agendaTime">

        <Clock size={18} />

        <span>

            {proximaCita.hora}

        </span>

    </div>

</div>

                            <div className="agendaPet">

                                <div>

                                    <strong>

                                        {proximaCita.mascota}

                                    </strong>

                                    <small>

                                        {proximaCita.propietario}

                                    </small>

                                </div>

                            </div>

                            <div className="agendaService">

                                <PawPrint size={18} />

                                <span>

                                    {proximaCita.motivo}

                                </span>

                            </div>

                            <div className="doctorBadge">

                                Dr. {proximaCita.doctor}

                            </div>

                        </div>

                    </div>

                )

            }

        </section>

    );

}

export default AgendaHoy;
