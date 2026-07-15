import { useEffect, useState } from "react";

import {

    Bell,

    CalendarDays,

    Clock3,

    ChevronDown

} from "lucide-react";

function Header(){

    const [fecha,setFecha]=useState("");

    const [hora,setHora]=useState("");

    useEffect(()=>{

        const actualizar=()=>{

            const ahora=new Date();

            setFecha(

                ahora.toLocaleDateString(

                    "es-PE",

                    {

                        weekday:"long",

                        day:"numeric",

                        month:"long",

                        year:"numeric"

                    }

                )

            );

            setHora(

                ahora.toLocaleTimeString(

                    "es-PE",

                    {

                        hour:"2-digit",

                        minute:"2-digit"

                    }

                )

            );

        };

        actualizar();

        const t=setInterval(actualizar,1000);

        return()=>clearInterval(t);

    },[]);

    return(

        <header className="header">

            <div>

                <h1 className="pageTitle">

                    ¡Buenos días, Administrador! 👋

                </h1>

                <p className="pageSubtitle">

                    Aquí tienes el resumen de tu clínica para hoy.

                </p>

            </div>

            <div className="headerRight">

                <button className="headerBell">

                    <Bell size={20}/>

                    <span className="bellBadge">

                        3

                    </span>

                </button>

                <div className="headerInfo">

                    <CalendarDays size={18}/>

                    {fecha}

                </div>

                <div className="headerInfo">

                    <Clock3 size={18}/>

                    {hora}

                </div>

             <div className="headerUser">

                <img
                    src="/images/avatar-admin.png"
                    alt="Administrador"
                />

            <div>

                <strong>

                    Administrador

                </strong>

              

            </div>

    <ChevronDown size={18}/>

</div>

            </div>

        </header>

    );

}

export default Header;
