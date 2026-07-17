import { useEffect, useState } from "react";

function VeterinarioModal({

    open,

    onClose,

    doctor,

    onGuardar

}) {

    const doctorInicial = {

        id: null,

        nombres: "",

        especialidad: "",

        telefono: "",

        correo: "",

        horario: "",

        estado: "ACTIVO"

    };

    const [form, setForm] = useState(doctorInicial);

    useEffect(() => {

        if (doctor) {

            setForm(doctor);

        } else {

            setForm(doctorInicial);

        }

    }, [doctor]);

    const handleChange = ({ target }) => {

        const { name, value } = target;

        setForm(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const guardar = async (e) => {

        e.preventDefault();

        if (!form.nombres.trim()) {

            alert("Ingrese el nombre del veterinario.");

            return;

        }

        if (!form.especialidad.trim()) {

            alert("Ingrese la especialidad.");

            return;

        }

        if (

            form.correo &&
            !/\S+@\S+\.\S+/.test(form.correo)

        ) {

            alert("Ingrese un correo válido.");

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

                            doctor

                                ? "Editar Veterinario"

                                : "Nuevo Veterinario"

                        }

                    </h2>

                </div>

                <form

                    className="modalForm"

                    onSubmit={guardar}

                >

                    <label>

                        Nombres

                    </label>

                    <input

                        name="nombres"

                        value={form.nombres}

                        onChange={handleChange}

                    />

                    <label>

                        Especialidad

                    </label>

                    <input

                        name="especialidad"

                        value={form.especialidad}

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

                        type="email"

                        name="correo"

                        value={form.correo}

                        onChange={handleChange}

                    />

                    <label>

                        Horario

                    </label>

                    <input

                        name="horario"

                        value={form.horario}

                        onChange={handleChange}

                    />

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

                        <option value="VACACIONES">

                            VACACIONES

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

                                doctor

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

export default VeterinarioModal;
