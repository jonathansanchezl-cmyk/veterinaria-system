import { FaSearch } from "react-icons/fa";

function VeterinarioSearch({

    value,

    onChange

}) {

    return (

        <div className="searchContainer">

            <div className="searchBox">

                <FaSearch className="searchIcon" />

                <input

                    type="text"

                    placeholder="Buscar veterinario..."

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

export default VeterinarioSearch;
