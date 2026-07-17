import { FaSearch } from "react-icons/fa";

function MascotaSearch({

    value,

    onChange

}) {

    return (

        <div className="searchContainer">

            <div className="searchBox">

                <FaSearch className="searchIcon" />

                <input

                    type="text"

                    placeholder="Buscar mascota por nombre, propietario, especie o raza..."

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

export default MascotaSearch;
