import { Search, RotateCcw } from "lucide-react";
import { useState } from "react";

function ReportFilters({

    onSearch,
    onClear

}) {

    const [filtros, setFiltros] = useState({

        desde: "",
        hasta: "",
        tipo: "TODOS"

    });

    const handleChange = (e) => {

        setFiltros({

            ...filtros,

            [e.target.name]: e.target.value

        });

    };

    return (

        <section className="reportFilters">

            <div className="filterItem">

                <label>

                    Desde

                </label>

                <input

                    type="date"

                    name="desde"

                    value={filtros.desde}

                    onChange={handleChange}

                />

            </div>

            <div className="filterItem">

                <label>

                    Hasta

                </label>

                <input

                    type="date"

                    name="hasta"

                    value={filtros.hasta}

                    onChange={handleChange}

                />

            </div>

            <div className="filterItem">

                <label>

                    Tipo de reporte

                </label>

                <select

                    name="tipo"

                    value={filtros.tipo}

                    onChange={handleChange}

                >

                    <option value="TODOS">

                        Todos

                    </option>

                    <option value="CLIENTES">

                        Clientes

                    </option>

                    <option value="MASCOTAS">

                        Mascotas

                    </option>

                    <option value="CITAS">

                        Citas

                    </option>

                    <option value="VETERINARIOS">

                        Veterinarios

                    </option>

                </select>

            </div>

            <div className="filterButtons">

                <button

                    className="btnSearch"

                    onClick={() => onSearch?.(filtros)}

                >

                    <Search size={18}/>

                    Buscar

                </button>

                <button

                    className="btnClear"

                    onClick={() => {

                        const limpio = {

                            desde: "",
                            hasta: "",
                            tipo: "TODOS"

                        };

                        setFiltros(limpio);

                        onClear?.();

                    }}

                >

                    <RotateCcw size={18}/>

                    Limpiar

                </button>

            </div>

        </section>

    );

}

export default ReportFilters;
