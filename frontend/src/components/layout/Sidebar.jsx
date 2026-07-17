import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaCalendarAlt,
    FaPaw,
    FaUsers,
    FaUserMd,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
    );

    const rol = (usuario.rol || "")
        .toUpperCase()
        .trim();

    const menu = [

        {
            nombre: "Dashboard",
            ruta: "/dashboard",
            icono: <FaTachometerAlt />,
            roles: ["ADMINISTRADOR", "VETERINARIO", "OPERADOR"]
        },

        {
            nombre: "Citas",
            ruta: "/citas",
            icono: <FaCalendarAlt />,
            roles: ["ADMINISTRADOR", "VETERINARIO", "OPERADOR"]
        },

        {
            nombre: "Mascotas",
            ruta: "/mascotas",
            icono: <FaPaw />,
            roles: ["ADMINISTRADOR", "VETERINARIO", "OPERADOR"]
        },

        {
            nombre: "Clientes",
            ruta: "/clientes",
            icono: <FaUsers />,
            roles: ["ADMINISTRADOR", "OPERADOR"]
        },


        {
            nombre: "Veterinarios",
            ruta: "/veterinarios",
            icono: <FaUserMd />,
            roles: ["ADMINISTRADOR"]
        },

        {
            nombre: "Usuarios",
            ruta: "/usuarios",
            icono: <FaUsers />,
            roles: ["ADMINISTRADOR"]
        },

        {
            nombre: "Reportes",
            ruta: "/reportes",
            icono: <FaChartBar />,
            roles: ["ADMINISTRADOR"]
        },


    ];

    const menuVisible = menu.filter(item =>
        item.roles.includes(rol)
    );

    function cerrarSesion() {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        window.location.href = "/";

    }

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

                    <span>
                        Clínica Veterinaria
                    </span>

                </div>

            </div>

            <nav className="sidebarMenu">

                {

                    menuVisible.map(item => (

                        <NavLink
                            key={item.ruta}
                            to={item.ruta}
                            className={({ isActive }) =>
                                isActive
                                    ? "menuItem active"
                                    : "menuItem"
                            }
                        >

                            <span className="menuIcon">

                                {item.icono}

                            </span>

                            <span>

                                {item.nombre}

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