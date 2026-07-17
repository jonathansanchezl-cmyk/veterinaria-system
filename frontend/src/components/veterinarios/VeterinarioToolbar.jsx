import { FaPlus, FaSearch } from "react-icons/fa";

function VeterinarioToolbar({

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

                        placeholder="Buscar veterinario..."

                        onChange={(e)=>

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

                    Nuevo Veterinario

                </button>

            </div>

        </div>

    );

}

export default VeterinarioToolbar;
