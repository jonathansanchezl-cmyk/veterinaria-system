import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
    crearCita,
    actualizarCita
} from "../../services/citasService";

import {
    getClientes
} from "../../services/clientesService";

import {
    getMascotasPorCliente
} from "../../services/mascotasService";

import {
    getDoctores
} from "../../services/doctoresService";

function AppointmentModal({

    isOpen,

    onClose,

    onSuccess,

    cita

}) {

    // ==========================================
    // CATÁLOGOS
    // ==========================================

    const [clientes, setClientes] = useState([]);

    const [mascotas, setMascotas] = useState([]);

    const [doctores, setDoctores] = useState([]);

    // ==========================================
    // ESTADO
    // ==========================================

    const [saving, setSaving] = useState(false);

    // ==========================================
    // FORMULARIO
    // ==========================================

    const formInicial = {

        id_cliente: "",

        id_mascota: "",

        id_doctor: "",

        propietario: "",

        mascota: "",

        doctor: "",

        fecha: "",

        hora: "",

        motivo: "",

        estado: "Pendiente",

        costo: ""

    };

    const [form, setForm] = useState(formInicial);

    // ==========================================
    // LIMPIAR FORMULARIO
    // ==========================================

    const limpiarFormulario = () => {

        setForm(formInicial);

        setMascotas([]);

    };
        // ==========================================
    // CARGAR CLIENTES Y DOCTORES
    // ==========================================

    useEffect(() => {

        if (!isOpen) return;

        const cargarCatalogos = async () => {

            try {

                const [

                    listaClientes,

                    listaDoctores

                ] = await Promise.all([

                    getClientes(),

                    getDoctores()

                ]);

                setClientes(listaClientes);

                setDoctores(listaDoctores);

            }

            catch (error) {

                console.error(error);

                Swal.fire({

                    icon: "error",

                    title: "Error",

                    text: "No fue posible cargar clientes y doctores."

                });

            }

        };

        cargarCatalogos();

    }, [isOpen]);


    // ==========================================
    // CARGAR DATOS PARA EDICIÓN
    // ==========================================

    useEffect(() => {

        if (!isOpen) return;

        if (!cita) {

            limpiarFormulario();

            return;

        }

        setForm({

            id_cliente: cita.id_cliente || "",

            id_mascota: cita.id_mascota || "",

            id_doctor: cita.id_doctor || "",

            propietario: cita.propietario || "",

            mascota: cita.mascota || "",

            doctor: cita.doctor || "",

            fecha: cita.fecha || "",

            hora: cita.hora || "",

            motivo: cita.motivo || "",

            estado: cita.estado || "PENDIENTE",

            costo: cita.costo ?? ""

        });

    }, [cita, isOpen]);


    // ==========================================
    // CARGAR MASCOTAS DEL CLIENTE
    // ==========================================

    useEffect(() => {

        if (!form.id_cliente) {

            setMascotas([]);

            return;

        }

        const cargarMascotas = async () => {

            try {

                const lista = await getMascotasPorCliente(

                    form.id_cliente

                );

                setMascotas(lista);

            }

            catch (error) {

                console.error(error);

                setMascotas([]);

            }

        };

        cargarMascotas();

    }, [form.id_cliente]);


    // ==========================================
    // CERRAR SI EL MODAL NO ESTÁ ABIERTO
    // ==========================================

    if (!isOpen) {

        return null;

    }
        // ==========================================
    // CAMBIO GENÉRICO DE CAMPOS
    // ==========================================

    const handleChange = ({ target }) => {

        const { name, value } = target;

        setForm((prev) => ({

            ...prev,

            [name]: value

        }));

    };


    // ==========================================
    // CLIENTE
    // ==========================================

    const handleClienteChange = ({ target }) => {

        const id = Number(target.value);

        const cliente = clientes.find(

            (c) => c.id === id

        );

        setForm((prev) => ({

            ...prev,

            id_cliente: id || "",

            propietario: cliente

                ? cliente.nombre

                : "",

            id_mascota: "",

            mascota: ""

        }));

    };


    // ==========================================
    // MASCOTA
    // ==========================================

    const handleMascotaChange = ({ target }) => {

        const id = Number(target.value);

        const mascota = mascotas.find(

            (m) => m.id === id

        );

        setForm((prev) => ({

            ...prev,

            id_mascota: id || "",

            mascota: mascota

                ? mascota.nombre

                : ""

        }));

    };


    // ==========================================
    // DOCTOR
    // ==========================================

    const handleDoctorChange = ({ target }) => {

        const id = Number(target.value);

        const doctor = doctores.find(

            (d) => d.id === id

        );

        setForm((prev) => ({

            ...prev,

            id_doctor: id || "",

            doctor: doctor

                ? doctor.nombres

                : ""

        }));

    };


    // ==========================================
    // GUARDAR
    // ==========================================

    const guardar = async (e) => {

        e.preventDefault();

        if (

            !form.id_cliente ||

            !form.id_mascota ||

            !form.id_doctor ||

            !form.fecha ||

            !form.hora ||

            !form.motivo

        ) {

            Swal.fire({

                icon: "warning",

                title: "Datos incompletos",

                text: "Complete todos los campos obligatorios."

            });

            return;

        }

        setSaving(true);

        try {

            const payload = {

                id_cliente: Number(form.id_cliente),

                id_mascota: Number(form.id_mascota),

                id_doctor: Number(form.id_doctor),

                // Compatibilidad temporal
                propietario: form.propietario,

                mascota: form.mascota,

                doctor: form.doctor,

                fecha: form.fecha,

                hora: form.hora,

                motivo: form.motivo,

                estado: form.estado,

                costo: Number(form.costo || 0)

            };

            if (cita) {

                await actualizarCita(

                    cita.id,

                    payload

                );

            }

            else {

                await crearCita(

                    payload

                );

            }

        await Swal.fire({

                icon: "success",

                title: cita

                    ? "Cita actualizada correctamente"

                    : "Cita registrada correctamente",

                timer: 1200,

                showConfirmButton: false

            });

            // Recargar la tabla
            await onSuccess();

            limpiarFormulario();

            onClose();

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No fue posible guardar la cita."

            });

        }

        finally {

            setSaving(false);

        }

    };
        // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="modalOverlay">

            <div className="modalCard">

                <div className="modalHeader">

                    <h2>

                        {

                            cita

                                ? "Editar Cita"

                                : "Nueva Cita"

                        }

                    </h2>

                </div>

                <form

                    className="modalForm"

                    onSubmit={guardar}

                >

                    {/* =======================================
                        CLIENTE
                    ======================================= */}

                    <label>

                        Cliente

                    </label>

                    <select

                        name="id_cliente"

                        value={form.id_cliente}

                        onChange={handleClienteChange}

                        disabled={clientes.length === 0}

                        autoFocus

                    >

                        <option value="">

                            {

                                clientes.length === 0

                                    ? "No existen clientes"

                                    : "Seleccione un cliente"

                            }

                        </option>

                        {

                            clientes.map((cliente) => (

                                <option

                                    key={cliente.id}

                                    value={cliente.id}

                                >

                                    {cliente.nombre}

                                </option>

                            ))

                        }

                    </select>


                    {/* =======================================
                        MASCOTA
                    ======================================= */}

                    <label>

                        Mascota

                    </label>

                    <select

                        name="id_mascota"

                        value={form.id_mascota}

                        onChange={handleMascotaChange}

                        disabled={!form.id_cliente}

                    >

                        <option value="">

                            {

                                !form.id_cliente

                                    ? "Seleccione un cliente"

                                    : mascotas.length === 0

                                        ? "El cliente no tiene mascotas"

                                        : "Seleccione una mascota"

                            }

                        </option>

                        {

                            mascotas.map((mascota) => (

                                <option

                                    key={mascota.id}

                                    value={mascota.id}

                                >

                                    {mascota.nombre}

                                </option>

                            ))

                        }

                    </select>


                    {/* =======================================
                        VETERINARIO
                    ======================================= */}

                    <label>

                        Veterinario

                    </label>

                    <select

                        name="id_doctor"

                        value={form.id_doctor}

                        onChange={handleDoctorChange}

                        disabled={doctores.length === 0}

                    >

                        <option value="">

                            {

                                doctores.length === 0

                                    ? "No existen veterinarios"

                                    : "Seleccione un veterinario"

                            }

                        </option>

                        {

                            doctores.map((doctor) => (

                                <option

                                    key={doctor.id}

                                    value={doctor.id}

                                >

                                    {doctor.nombres}

                                </option>

                            ))

                        }

                    </select>


                    {/* =======================================
                        FECHA
                    ======================================= */}

                    <label>

                        Fecha

                    </label>

                    <input

                        type="date"

                        name="fecha"

                        value={form.fecha}

                        onChange={handleChange}

                    />


                    {/* =======================================
                        HORA
                    ======================================= */}

                    <label>

                        Hora

                    </label>

                    <input

                        type="time"

                        name="hora"

                        value={form.hora}

                        onChange={handleChange}

                    />


                    {/* =======================================
                        MOTIVO
                    ======================================= */}

                    <label>

                        Motivo

                    </label>

                    <input

                        type="text"

                        name="motivo"

                        placeholder="Ej. Vacunación anual"

                        value={form.motivo}

                        onChange={handleChange}

                    />


                    {/* =======================================
                        ESTADO
                    ======================================= */}

                    <label>

                        Estado

                    </label>

                    <select

                        name="estado"

                        value={form.estado}

                        onChange={handleChange}

                    >

                        <option value="Pendiente">

                            Pendiente

                        </option>

                        <option value="Confirmada">

                            Confirmada

                        </option>

                        <option value="Atendida">

                            Atendida

                        </option>

                        <option value="En_Atencion">

                            En_Atencion

                        </option>

                        <option value="Cancelada">

                            Cancelada

                        </option>


                    </select>


                    {/* =======================================
                        COSTO
                    ======================================= */}

                    <label>

                        Costo

                    </label>

                    <input

                        type="number"

                        step="0.01"

                        min="0"

                        name="costo"

                        placeholder="0.00"

                        value={form.costo}

                        onChange={handleChange}

                    />
                         {/* =======================================
                        BOTONES
                    ======================================= */}

                    <div className="modalButtons">

                        <button

                            type="button"

                            className="btn secondary"

                            disabled={saving}

                            onClick={() => {

                                limpiarFormulario();

                                onClose();

                            }}

                        >

                            Cancelar

                        </button>

                        <button

                            type="submit"

                            className="btn primary"

                            disabled={saving}

                        >

                            {

                                saving

                                    ? "Guardando..."

                                    : cita

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

export default AppointmentModal;
               