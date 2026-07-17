import { useEffect, useState } from "react";

function ClienteModal({

    open,

    onClose,

    cliente,

    onGuardar

}) {

    const clienteInicial = {

        id: null,

        nombre: "",

        dni: "",

        telefono: "",

        email: "",

        direccion: ""

    };

    const [form, setForm] = useState(clienteInicial);

    useEffect(() => {

        if (cliente) {

            setForm(cliente);

        } else {

            setForm(clienteInicial);

        }

    }, [cliente]);

    const handleChange = ({ target }) => {

        const { name, value } = target;

        setForm((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const guardar = async (e) => {

        e.preventDefault();

        if (

            !form.nombre ||

            !form.dni

        ) {

            alert("Nombre y DNI son obligatorios.");

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

                            cliente

                                ? "Editar Cliente"

                                : "Nuevo Cliente"

                        }

                    </h2>

                </div>

                <form

                    className="modalForm"

                    onSubmit={guardar}

                >

                    <label>

                        Nombre

                    </label>

                    <input

                        name="nombre"

                        value={form.nombre}

                        onChange={handleChange}

                    />

                    <label>

                        DNI

                    </label>

                    <input

                        name="dni"

                        value={form.dni}

                        onChange={handleChange}

                    />

                    <label>

                        Teléfono

                    </label>

                    <input

                        name="telefono"

                        value={form.telefono}

                        onChange={handleChange}

                    />

                    <label>

                        Correo

                    </label>

                    <input

                        name="email"

                        type="email"

                        value={form.email}

                        onChange={handleChange}

                    />

                    <label>

                        Dirección

                    </label>

                    <input

                        name="direccion"

                        value={form.direccion}

                        onChange={handleChange}

                    />

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

                                cliente

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

export default ClienteModal;
