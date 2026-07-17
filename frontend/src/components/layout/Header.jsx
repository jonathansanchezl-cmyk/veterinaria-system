import { useEffect, useState } from "react";

import {
    CalendarDays,
    Clock3,
    ChevronDown
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Header() {

    const { usuario } = useAuth();

    const [fecha, setFecha] = useState("");

    const [hora, setHora] = useState("");

    useEffect(() => {

        const actualizar = () => {

            const ahora = new Date();

            setFecha(

                ahora.toLocaleDateString(

                    "es-PE",

                    {

                        weekday: "long",

                        day: "numeric",

                        month: "long",

                        year: "numeric"

                    }

                )

            );

            setHora(

                ahora.toLocaleTimeString(

                    "es-PE",

                    {

                        hour: "2-digit",

                        minute: "2-digit"

                    }

                )

            );

        };

        actualizar();

        const timer = setInterval(actualizar, 1000);

        return () => clearInterval(timer);

    }, []);

    const nombreUsuario =

        usuario?.nombre ||

        usuario?.usuario ||

        "Usuario";

    const rolUsuario =

        usuario?.rol ||

        "Operador";

    return (

        <header className="header">

            <div>

                <h1 className="pageTitle">

                    ¡Buenos días, {nombreUsuario}! 👋

                </h1>

                <p className="pageSubtitle">

                    Aquí tienes el resumen de tu clínica para hoy.

                </p>

            </div>

            <div className="headerRight">

                

                <div className="headerInfo">

                    <CalendarDays size={18} />

                    {fecha}

                </div>

                <div className="headerInfo">

                    <Clock3 size={18} />

                    {hora}

                </div>

                <div className="headerUser">

                    <img

                        src="/images/avatar-admin.png"

                        alt={nombreUsuario}

                    />

                    <div>

                        <strong>

                            {nombreUsuario}

                        </strong>

                        <br />

                        <small>

                            {rolUsuario}

                        </small>

                    </div>

                    <ChevronDown size={18} />

                </div>

            </div>

        </header>

    );

}

export default Header;
