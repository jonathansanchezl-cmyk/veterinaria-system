import { useEffect, useState } from "react";
import Modal from "../common/Modal";

const usuarioInicial = {
    nombre: "",
    usuario: "",
    email: "",
    password: "",
    rol: "OPERADOR",
    estado: "ACTIVO"
};

function UsuarioModal({

    open,

    onClose,

    usuario,

    onGuardar,

    onSuccess

}) {

    const [form, setForm] = useState(usuarioInicial);

    useEffect(() => {

        if (usuario) {

            setForm({

                ...usuario,

                password: ""

            });

        } else {

            setForm(usuarioInicial);

        }

    }, [usuario]);

    const handleChange = (e) => {

        const {

            name,

            value

        } = e.target;

        setForm({

            ...form,

            [name]: value

        });

    };

    const guardar = async (e) => {

        e.preventDefault();

        const datos = { ...form };

        // Si se está editando y no cambia contraseña,
        // no la enviamos al backend.

        if (usuario && !datos.password) {

            delete datos.password;

        }

        await onGuardar(datos);

        if (onSuccess) {

            onSuccess();

        }

        onClose();

    };

    if (!open) return null;

    return (

        <Modal
            open={open}
            onClose={onClose}
            title={
                usuario
                    ? "Editar Usuario"
                    : "Nuevo Usuario"
            }
        >

            <form
                className="formGrid"
                onSubmit={guardar}
            >

                <div className="formGroup">

                    <label>

                        Nombre

                    </label>

                    <input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="formGroup">

                    <label>

                        Usuario

                    </label>

                    <input
                        name="usuario"
                        value={form.usuario}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="formGroup">

                    <label>

                        Correo

                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="formGroup">

                    <label>

                        Contraseña

                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder={
                            usuario
                                ? "Dejar vacío para conservar"
                                : ""
                        }
                        required={!usuario}
                    />

                </div>

                <div className="formGroup">

                    <label>

                        Rol

                    </label>

                    <select
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                    >

                        <option value="ADMINISTRADOR">

                            Administrador

                        </option>

                        <option value="VETERINARIO">

                            Veterinario

                        </option>

                        <option value="OPERADOR">

                            Operador

                        </option>

                    </select>

                </div>

                <div className="formGroup">

                    <label>

                        Estado

                    </label>

                    <select
                        name="estado"
                        value={form.estado}
                        onChange={handleChange}
                    >

                        <option value="ACTIVO">

                            Activo

                        </option>

                        <option value="INACTIVO">

                            Inactivo

                        </option>

                    </select>

                </div>

                <div className="modalActions">

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

                        Guardar

                    </button>

                </div>

            </form>

        </Modal>

    );

}

export default UsuarioModal;
