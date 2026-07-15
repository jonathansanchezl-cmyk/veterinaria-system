import { useEffect, useState } from "react";
import {
    Bell,
    CalendarDays,
    Clock,
    ChevronDown
} from "lucide-react";




<div className="userProfile">

    <FaUserCircle className="userAvatar" />

    <div>

        <strong>
            {usuario}
        </strong>

        <small>
            {cargo}
        </small>

    </div>

</div>
const [fechaActual, setFechaActual] = useState("");
const [horaActual, setHoraActual] = useState("");

useEffect(() => {

    const actualizar = () => {

        const ahora = new Date();

        setFechaActual(
            ahora.toLocaleDateString("es-PE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            })
        );

        setHoraActual(
            ahora.toLocaleTimeString("es-PE", {
                hour: "2-digit",
                minute: "2-digit"
            })
        );

    };

    actualizar();

    const timer = setInterval(actualizar, 1000);

    return () => clearInterval(timer);

}, []);

<div className="headerRight">

    <button className="headerIcon">

        <Bell size={22}/>

        <span className="badge">

            3

        </span>

    </button>

    <div className="headerInfo">

        <CalendarDays size={18}/>

        <span>{fechaActual}</span>

    </div>

    <div className="headerInfo">

        <Clock size={18}/>

        <span>{horaActual}</span>

    </div>

    <div className="userProfile">

        <img
            src="/images/avatar-admin.png"
            className="userAvatar"
            alt=""
        />

        <div>

            <strong>{usuario}</strong>

            <small>{cargo}</small>

        </div>

        <ChevronDown size={18}/>

    </div>

</div>

