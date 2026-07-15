import { NavLink } from "react-router-dom";

import {

    House,

    CalendarDays,

    Stethoscope,

    Users,

    PawPrint,

    ClipboardList,

    UserCog,

    BarChart3,

    Settings,

    CircleHelp

} from "lucide-react";

function Sidebar(){

    const menu=[

        {

            title:"Inicio",

            path:"/dashboard",

            icon:<House size={21}/>

        },

        {

            title:"Citas",

            path:"/citas",

            icon:<CalendarDays size={21}/>

        },

        {

            title:"Doctores",

            path:"/veterinarios",

            icon:<Stethoscope size={21}/>

        },

        {

            title:"Clientes",

            path:"/clientes",

            icon:<Users size={21}/>

        },

        {

            title:"Mascotas",

            path:"/mascotas",

            icon:<PawPrint size={21}/>

        },

        {

            title:"Historial Clínico",

            path:"/historial",

            icon:<ClipboardList size={21}/>

        },

        {

            title:"Operadores",

            path:"/operadores",

            icon:<UserCog size={21}/>

        },

        {

            title:"Reportes",

            path:"/reportes",

            icon:<BarChart3 size={21}/>

        },

        {

            title:"Configuración",

            path:"/configuracion",

            icon:<Settings size={21}/>

        }

    ];

    return(

        <aside className="sidebar">

            <div>

                <div className="sidebarLogo">

                    <img

                        src="/images/logo-animalia.png"

                        alt="Animalia"

                        className="logoImage"

                    />

                    <div>

                        <h2>

                            ANIMALIA

                        </h2>

                        <span>

                            Clínica Veterinaria

                        </span>

                    </div>

                </div>

                <nav className="sidebarMenu">

                    {

                        menu.map(item=>(

                            <NavLink

                                key={item.path}

                                to={item.path}

                                className={({isActive})=>

                                    isActive

                                    ? "menuItem active"

                                    : "menuItem"

                                }

                            >

                                <span className="menuIcon">

                                    {item.icon}

                                </span>

                                {item.title}

                            </NavLink>

                        ))

                    }

                </nav>

            </div>

            <div className="sidebarHelp">

                <CircleHelp size={22}/>

                <div>

                    <strong>

                        Ayuda y soporte

                    </strong>

                    <small>

                        Manual del sistema

                    </small>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;
