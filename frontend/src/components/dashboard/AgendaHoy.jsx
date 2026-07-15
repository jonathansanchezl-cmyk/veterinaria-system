import { Clock, CalendarDays, PawPrint } from "lucide-react";

const agenda = [
    {
        id: 1,
        hora: "08:00",
        mascota: "Rocky",
        raza: "Golden Retriever",
        servicio: "Vacunación",
        veterinario: "Dr. Pérez",
        foto: "/images/pets/rocky.jpg"
    },
    {
        id: 2,
        hora: "09:00",
        mascota: "Luna",
        raza: "Persa",
        servicio: "Consulta General",
        veterinario: "Dra. Ramos",
        foto: "/images/pets/luna.jpg"
    },
    {
        id: 3,
        hora: "10:30",
        mascota: "Simba",
        raza: "Labrador",
        servicio: "Control",
        veterinario: "Dr. Pérez",
        foto: "/images/pets/simba.jpg"
    },
    {
        id: 4,
        hora: "11:30",
        mascota: "Max",
        raza: "Bulldog",
        servicio: "Cirugía",
        veterinario: "Dr. Castillo",
        foto: "/images/pets/max.jpg"
    },
    {
        id: 5,
        hora: "12:30",
        mascota: "Lola",
        raza: "Beagle",
        servicio: "Desparasitación",
        veterinario: "Dra. Ramos",
        foto: "/images/pets/lola.jpg"
    }
];

function AgendaHoy() {

    return (

        <section className="agendaPanel">

            <div className="panelHeader">

                <div>

                    <h2>

                        <CalendarDays size={24} />

                        Agenda de Hoy

                    </h2>

                    <p className="panelSubtitle">

                        {agenda.length} citas programadas

                    </p>

                </div>

                <button className="btnPrimary">

                    Ver agenda completa

                </button>

            </div>

            <div className="agendaList">

                {

                    agenda.map((cita) => (

                        <div
                            key={cita.id}
                            className="agendaItem"
                        >

                            {/* Hora */}

                            <div className="agendaHour">

                                <Clock size={18} />

                                <span>

                                    {cita.hora}

                                </span>

                            </div>

                            {/* Mascota */}

                            <div className="agendaPet">

                                <img
                                    src={cita.foto}
                                    alt={cita.mascota}
                                />

                                <div>

                                    <strong>

                                        {cita.mascota}

                                    </strong>

                                    <small>

                                        {cita.raza}

                                    </small>

                                </div>

                            </div>

                            {/* Servicio */}

                            <div className="agendaService">

                                <PawPrint size={18} />

                                <span>

                                    {cita.servicio}

                                </span>

                            </div>

                            {/* Veterinario */}

                            <div className="doctorBadge">

                                {cita.veterinario}

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default AgendaHoy;