import { FaSearch } from "react-icons/fa";

function ClienteSearch({

    value,

    onChange

}) {

    return (

        <div className="searchContainer">

            <div className="searchBox">

                <FaSearch className="searchIcon" />

                <input

                    type="text"

                    placeholder="Buscar cliente por nombre, DNI, teléfono o correo..."

                    value={value}

                    onChange={(e) =>

                        onChange(

                            e.target.value

                        )

                    }

                />

            </div>

        </div>

    );

}

export default ClienteSearch;

