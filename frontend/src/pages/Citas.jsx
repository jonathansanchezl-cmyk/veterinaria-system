import { useEffect, useState } from "react";

import axios from "axios";

import Swal from "sweetalert2";

import "./Citas.css";

function Citas() {

  // ======================================
  // STATES
  // ======================================

  const [citas, setCitas] = useState([]);

  const [mascotas, setMascotas] = useState([]);

  const [doctores, setDoctores] = useState([]);

  const [form, setForm] = useState({

    mascota: "",

    propietario: "",

    doctor: "",

    fecha: "",

    hora: "",

    motivo: "",

    costo: "",

    estado: "CONFIRMADO"

  });

  // ======================================
  // LOAD DATA
  // ======================================

  useEffect(() => {

    obtenerCitas();

    obtenerMascotas();

    obtenerDoctores();

  }, []);

  // ======================================
  // OBTENER CITAS
  // ======================================

  const obtenerCitas = async () => {

    try {

      const response = await axios.get(

        "http://localhost:4000/api/citas"

      );

      setCitas(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ======================================
  // OBTENER MASCOTAS
  // ======================================

  const obtenerMascotas = async () => {

    try {

      const response = await axios.get(

        "http://localhost:4000/api/mascotas"

      );

      setMascotas(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ======================================
  // OBTENER DOCTORES
  // ======================================

  const obtenerDoctores = async () => {

    try {

      const response = await axios.get(

        "http://localhost:4000/api/doctores"

      );

      setDoctores(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ======================================
  // HANDLE CHANGE
  // ======================================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  // ======================================
  // REGISTRAR CITA
  // ======================================

  const registrarCita = async () => {

    if (

      !form.mascota ||

      !form.propietario ||

      !form.doctor ||

      !form.fecha ||

      !form.hora ||

      !form.motivo ||

      !form.costo

    ) {

      Swal.fire({

        title: "Campos incompletos",

        text: "Debe completar todos los campos",

        icon: "warning"

      });

      return;

    }

    try {

      await axios.post(

        "http://localhost:4000/api/citas",

        form

      );

      Swal.fire({

        title: "Cita registrada",

        text: "La cita fue registrada correctamente",

        icon: "success",

        timer: 2000,

        showConfirmButton: false

      });

      setForm({

        mascota: "",

        propietario: "",

        doctor: "",

        fecha: "",

        hora: "",

        motivo: "",

        costo: "",

        estado: "CONFIRMADO"

      });

      obtenerCitas();

    } catch (error) {

      console.log(error);

      Swal.fire({

        title: "Error",

        text: "No se pudo registrar la cita",

        icon: "error"

      });

    }

  };

  // ======================================
  // ELIMINAR CITA
  // ======================================

  const eliminarCita = async (id) => {

    const resultado = await Swal.fire({

      title: "Confirmar eliminación",

      text: "¿Desea eliminar esta cita?",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ef4444",

      cancelButtonColor: "#6b7280",

      confirmButtonText: "Sí, eliminar",

      cancelButtonText: "Cancelar"

    });

    if (!resultado.isConfirmed) {

      return;

    }

    try {

      await axios.delete(

        `http://localhost:4000/api/citas/${id}`

      );

      Swal.fire({

        title: "Cita eliminada",

        text: "La cita fue eliminada correctamente",

        icon: "success",

        timer: 2000,

        showConfirmButton: false

      });

      obtenerCitas();

    } catch (error) {

      console.log(error);

      Swal.fire({

        title: "Error",

        text: "No se pudo eliminar la cita",

        icon: "error"

      });

    }

  };

  // ======================================
  // RENDER
  // ======================================

  return (

    <div className="citas-container">

      <h1 className="titulo-citas">

        Gestión de Citas

      </h1>

      <p className="subtitulo-citas">

        Administra las citas veterinarias del sistema

      </p>

      {/* ====================================== */}
      {/* FORMULARIO */}
      {/* ====================================== */}

      <div className="formulario-citas">

        {/* MASCOTA */}

        <select

          name="mascota"

          value={form.mascota}

          onChange={(e) => {

            const nombreMascota =
              e.target.value;

            const mascotaSeleccionada =
              mascotas.find(

                (m) =>
                  m.nombre === nombreMascota

              );

            setForm({

              ...form,

              mascota: nombreMascota,

              propietario:
                mascotaSeleccionada?.propietario || ""

            });

          }}

          className="input-citas"

        >

          <option value="">

            Seleccione Mascota

          </option>

          {mascotas.map((mascota) => (

            <option

              key={mascota.id}

              value={mascota.nombre}

            >

              {mascota.nombre}

            </option>

          ))}

        </select>

        {/* PROPIETARIO AUTOMATICO */}

        <input

          type="text"

          value={form.propietario}

          className="input-citas"

          placeholder="Propietario"

          disabled

        />

        {/* DOCTOR */}

        <select

          name="doctor"

          value={form.doctor}

          onChange={handleChange}

          className="input-citas"

        >

          <option value="">

            Seleccione Doctor

          </option>

          {doctores.map((doctor) => (

            <option

              key={doctor.id}

              value={doctor.nombres}

            >

              {doctor.nombres}

            </option>

          ))}

        </select>

        {/* FECHA */}

        <input

          type="date"

          name="fecha"

          value={form.fecha}

          onChange={handleChange}

          className="input-citas"

        />

        {/* HORA */}

        <input

          type="time"

          name="hora"

          value={form.hora}

          onChange={handleChange}

          className="input-citas"

        />

        {/* MOTIVO */}

        <input

          type="text"

          name="motivo"

          placeholder="Motivo"

          value={form.motivo}

          onChange={handleChange}

          className="input-citas"

        />

        {/* COSTO */}

        <input

          type="number"

          name="costo"

          placeholder="Costo"

          value={form.costo}

          onChange={handleChange}

          className="input-citas"

        />

        {/* ESTADO */}

        <select

          name="estado"

          value={form.estado}

          onChange={handleChange}

          className="input-citas"

        >

          <option value="CONFIRMADO">

            CONFIRMADO

          </option>

          <option value="PENDIENTE">

            PENDIENTE

          </option>

          <option value="ATENDIDO">

            ATENDIDO

          </option>

        </select>

        {/* BOTON */}

        <button

          onClick={registrarCita}

          className="btn-guardar-cita"

        >

          Registrar Cita

        </button>

      </div>

      {/* ====================================== */}
      {/* TABLA */}
      {/* ====================================== */}

      <div className="tabla-citas">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Mascota</th>

              <th>Propietario</th>

              <th>Doctor</th>

              <th>Fecha</th>

              <th>Hora</th>

              <th>Motivo</th>

              <th>Costo</th>

              <th>Estado</th>

              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {citas.map((cita) => (

              <tr key={cita.id}>

                <td>{cita.id}</td>

                <td>{cita.mascota}</td>

                <td>{cita.propietario}</td>

                <td>{cita.doctor}</td>

                <td>{cita.fecha}</td>

                <td>{cita.hora}</td>

                <td>{cita.motivo}</td>

                <td>S/. {cita.costo}</td>

                <td>{cita.estado}</td>

                <td>

                  <button

                    className="btn-eliminar"

                    onClick={() =>

                      eliminarCita(cita.id)

                    }

                  >

                    Eliminar

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Citas;
