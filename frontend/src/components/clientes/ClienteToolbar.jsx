import { FaPlus, FaSearch } from "react-icons/fa";

function ClienteToolbar({

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

                        placeholder="Buscar cliente..."

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

                    Nuevo Cliente

                </button>

            </div>

        </div>

    );

}

export default ClienteToolbar;
