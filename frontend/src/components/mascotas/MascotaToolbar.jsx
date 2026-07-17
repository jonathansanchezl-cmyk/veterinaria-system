import { FaPlus, FaSearch } from "react-icons/fa";

function MascotaToolbar({

    onNuevo,

    onBuscar

}) {

    return (

        <div className="appointmentToolbar">

            <div className="toolbarLeft">

                <div className="searchBox">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Buscar mascota..."

                        onChange={(e) =>

                            onBuscar(e.target.value)

                        }

                    />

                </div>

            </div>

            <div className="toolbarRight">

                <button

                    className="btn primary"

                    onClick={onNuevo}

                >

                    <FaPlus />

                    Nueva Mascota

                </button>

            </div>

        </div>

    );

}

export default MascotaToolbar;
