import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    FaTachometerAlt,
    FaCalendarAlt,
    FaPaw,
    FaUsers,
    FaUserMd,
    FaChartBar,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const { usuario, logout } = useAuth();

    console.log("Sidebar usuario:", usuario);
    console.log("Sidebar rol:", usuario?.rol);
    console.log("LocalStorage:", JSON.parse(localStorage.getItem("usuario")));


    const usuarioLS = JSON.parse(localStorage.getItem("usuario") || "null");

    const rol = (usuarioLS?.rol || "").toUpperCase().trim();

    alert("ROL = " + rol);




    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaTachometerAlt />,
            roles: ["ADMINISTRADOR","VETERINARIO","OPERADOR"]
        },

        {
            name: "Citas",
            path: "/citas",
            icon: <FaCalendarAlt />,
            roles: ["ADMINISTRADOR","VETERINARIO","OPERADOR"]
        },

        {
            name: "Mascotas",
            path: "/mascotas",
            icon: <FaPaw />,
            roles: ["ADMINISTRADOR","VETERINARIO","OPERADOR"]
        },

        {
            name: "Clientes",
            path: "/clientes",
            icon: <FaUsers />,
            roles: ["ADMINISTRADOR","OPERADOR"]
        },

 
        {
            name: "Veterinarios",
            path: "/veterinarios",
            icon: <FaUserMd />,
            roles: ["ADMINISTRADOR"]
        },

        {
            name: "Reportes",
            path: "/reportes",
            icon: <FaChartBar />,
            roles: ["ADMINISTRADOR"]
        },

        {
            name: "Configuración",
            path: "/configuracion",
            icon: <FaCog />,
            roles: ["ADMINISTRADOR"]
        }

    ];

    const menuVisible = menu.filter(item =>
        item.roles.includes(rol)
    );

    const cerrarSesion = () => {

        logout();

        window.location.href = "/";

    };

    return (

        <aside className="sidebar">

            <div className="sidebarLogo">

                <div className="logoImage">

                    <img
                        src="/images/logo.png"
                        alt="Animalia"
                    />

                </div>

                <div>

                    <h2>ANIMALIA</h2>

                    <span>Clínica Veterinaria</span>

                </div>

            </div>

            <nav className="sidebarMenu">

                {

                    menuVisible.map(item => (

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

                            <span>

                                {item.name}

                            </span>

                        </NavLink>

                    ))

                }

            </nav>

            <div className="sidebarFooter">

                <button

                    className="logoutButton"

                    onClick={cerrarSesion}

                >

                    <FaSignOutAlt/>

                    <span>

                        Cerrar sesión

                    </span>

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;
