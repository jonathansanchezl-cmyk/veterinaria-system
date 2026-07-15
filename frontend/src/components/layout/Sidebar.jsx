import { NavLink } from "react-router-dom";

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

    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaTachometerAlt />
        },

        {
            name: "Citas",
            path: "/citas",
            icon: <FaCalendarAlt />
        },

        {
            name: "Mascotas",
            path: "/mascotas",
            icon: <FaPaw />
        },

        {
            name: "Clientes",
            path: "/clientes",
            icon: <FaUsers />
        },

        {
            name: "Veterinarios",
            path: "/veterinarios",
            icon: <FaUserMd />
        },

        {
            name: "Reportes",
            path: "/reportes",
            icon: <FaChartBar />
        },

        {
            name: "Configuración",
            path: "/configuracion",
            icon: <FaCog />
        }

    ];

    const cerrarSesion = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

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

                    menu.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
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

                    <FaSignOutAlt />

                    <span>

                        Cerrar sesión

                    </span>

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;