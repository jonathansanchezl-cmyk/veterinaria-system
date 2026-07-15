import { FaCalendarAlt } from "react-icons/fa";

const citas = [

    {
        mascota:"Bruno",
        hora:"03:00 PM",
        doctor:"Dr. Pérez",
        fecha:"Hoy"
    },

    {
        mascota:"Michi",
        hora:"04:30 PM",
        doctor:"Dra. Ramos",
        fecha:"Hoy"
    },

    {
        mascota:"Firulais",
        hora:"05:30 PM",
        doctor:"Dr. Castillo",
        fecha:"Hoy"
    }

];

function UpcomingAppointments(){

    return(

        <section className="nextAppointments">

            <div className="panelHeader">

                <h2>

                    <FaCalendarAlt/>

                    Próximas citas

                </h2>

            </div>

            {

                citas.map((item,index)=>(

                    <div
                        key={index}
                        className="nextItem"
                    >

                        <div>

                            <strong>

                                {item.mascota}

                            </strong>

                            <p>

                                {item.doctor}

                            </p>

                        </div>

                        <div className="nextHour">

                            <span>

                                {item.hora}

                            </span>

                            <small>

                                {item.fecha}

                            </small>

                        </div>

                    </div>

                ))

            }

        </section>

    );

}

export default UpcomingAppointments;
