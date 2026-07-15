import {
    FaPlus,
    FaSearch,
    FaCalendarAlt,
    FaFilter
} from "react-icons/fa";

function AppointmentToolbar({

    onNew,
    onSearch,
    onEstadoChange,
    onFechaChange

}) {

    return (

        <div className="appointmentToolbar">

            <div className="toolbarLeft">

                {/* BUSCADOR */}

                <div className="searchBox">

                    <FaSearch className="toolbarIcon" />

                    <input
                        type="text"
                        placeholder="Buscar mascota, propietario, veterinario..."
                        onChange={(e) => onSearch?.(e.target.value)}
                    />

                </div>

                {/* FILTRO ESTADO */}

                <div className="filterBox">

                    <FaFilter className="toolbarIcon" />

                    <select
                        defaultValue=""
                        onChange={(e) => onEstadoChange?.(e.target.value)}
                    >

                        <option value="">
                            Todos los estados
                        </option>

                        <option value="CONFIRMADO">
                            Confirmado
                        </option>

                        <option value="PENDIENTE">
                            Pendiente
                        </option>

                        <option value="ATENDIDO">
                            Atendido
                        </option>

                        <option value="CANCELADO">
                            Cancelado
                        </option>

                    </select>

                </div>

                {/* FECHA */}

                <div className="dateFilter">

                    <FaCalendarAlt className="toolbarIcon" />

                    <input
                        type="date"
                        onChange={(e) => onFechaChange?.(e.target.value)}
                    />

                </div>

            </div>

            <div className="toolbarRight">

                <button

                    type="button"

                    className="btn primary"

                    onClick={onNew}

                >

                    <FaPlus />

                    <span>

                        Nueva Cita

                    </span>

                </button>

            </div>

        </div>

    );

}

export default AppointmentToolbar;
