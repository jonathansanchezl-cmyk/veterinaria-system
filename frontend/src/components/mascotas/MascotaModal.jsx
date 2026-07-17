import { useEffect, useState } from "react";

import { getClientes } from "../../services/clientesService";

function MascotaModal({

    open,

    onClose,

    mascota,

    onGuardar

}) {

    const mascotaInicial = {

        id: null,

        id_cliente: "",

        propietario: "",

        nombre: "",

        especie: "",

        raza: "",

        edad: "",

        sexo: "",

        estado: "ACTIVO"

    };

    const [form, setForm] = useState(mascotaInicial);

    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        cargarClientes();

    }, []);

    useEffect(() => {

        if (mascota) {

            setForm(mascota);

        }

        else {

            setForm(mascotaInicial);

        }

    }, [mascota]);

    const cargarClientes = async () => {

        try {

            const data = await getClientes();

            setClientes(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const {

            name,

            value

        } = e.target;

        if (name === "id_cliente") {

            const cliente = clientes.find(

                c => c.id === Number(value)

            );

            setForm({

                ...form,

                id_cliente: value,

                propietario: cliente ? cliente.nombre : ""

            });

            return;

        }

        setForm({

            ...form,

            [name]: value

        });

    };

    const guardar = async (e) => {

        e.preventDefault();

        if (

            !form.id_cliente ||

            !form.nombre

        ) {

            alert("Seleccione un cliente y el nombre de la mascota.");

            return;

        }

        await onGuardar(form);

        onClose();

    };

    if (!open) {

        return null;

    }

    return (

        <div className="modalOverlay">

            <div className="modalCard">

                <div className="modalHeader">

                    <h2>

                        {

                            mascota

                                ? "Editar Mascota"

                                : "Nueva Mascota"

                        }

                    </h2>

                </div>

                <form

                    className="modalForm"

                    onSubmit={guardar}

                >

                    <label>

                        Cliente

                    </label>

                    <select

                        name="id_cliente"

                        value={form.id_cliente}

                        onChange={handleChange}

                    >

                        <option value="">

                            Seleccione...

                        </option>

                        {

                            clientes.map(cliente => (

                                <option

                                    key={cliente.id}

                                    value={cliente.id}

                                >

                                    {cliente.nombre}

                                </option>

                            ))

                        }

                    </select>

                    <label>

                        Nombre

                    </label>

                    <input

                        name="nombre"

                        value={form.nombre}

                        onChange={handleChange}

                    />

                    <label>

                        Especie

                    </label>

                    <input

                        name="especie"

                        value={form.especie}

                        onChange={handleChange}

                    />

                    <label>

                        Raza

                    </label>

                    <input

                        name="raza"

                        value={form.raza}

                        onChange={handleChange}

                    />

                    <label>

                        Edad

                    </label>

                    <input

                        type="number"

                        name="edad"

                        value={form.edad}

                        onChange={handleChange}

                    />

                    <label>

                        Sexo

                    </label>

                    <select

                        name="sexo"

                        value={form.sexo}

                        onChange={handleChange}

                    >

                        <option value="">

                            Seleccione...

                        </option>

                        <option value="Macho">

                            Macho

                        </option>

                        <option value="Hembra">

                            Hembra

                        </option>

                    </select>

                    <label>

                        Estado

                    </label>

                    <select

                        name="estado"

                        value={form.estado}

                        onChange={handleChange}

                    >

                        <option value="ACTIVO">

                            ACTIVO

                        </option>

                        <option value="INACTIVO">

                            INACTIVO

                        </option>

                    </select>

                    <div className="modalButtons">

                        <button

                            type="button"

                            className="btn secondary"

                            onClick={onClose}

                        >

                            Cancelar

                        </button>

                        <button

                            type="submit"

                            className="btn primary"

                        >

                            {

                                mascota

                                    ? "Actualizar"

                                    : "Guardar"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default MascotaModal;
