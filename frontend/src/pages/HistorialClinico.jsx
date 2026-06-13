import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "./HistorialClinico.css";

function HistorialClinico() {

  // =========================================
  // STATES
  // =========================================

  const [historial, setHistorial] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [doctores, setDoctores] = useState([]);

  const [mensaje, setMensaje] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [registroEliminar, setRegistroEliminar] = useState(null);

  const [formData, setFormData] = useState({
    mascota: "",
    doctor: "",
    diagnostico: "",
    tratamiento: "",
    observaciones: "",
    peso: "",
    temperatura: "",
  });

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {
    obtenerHistorial();
    obtenerMascotas();
    obtenerDoctores();
  }, []);

  // =========================================
  // OBTENER HISTORIAL
  // =========================================

  const obtenerHistorial = async () => {
    try {

      const response = await axios.get(
        "http://localhost:4000/api/historial"
      );

      setHistorial(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // OBTENER MASCOTAS
  // =========================================

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

  // =========================================
  // OBTENER DOCTORES
  // =========================================

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

  // =========================================
  // HANDLE INPUTS
  // =========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // =========================================
  // MOSTRAR MENSAJE
  // =========================================

  const mostrarModal = (texto) => {

    setMensaje(texto);
    setMostrarMensaje(true);

  };

  // =========================================
  // REGISTRAR HISTORIAL
  // =========================================

  const registrarHistorial = async () => {

    if (
      !formData.mascota ||
      !formData.doctor ||
      !formData.diagnostico ||
      !formData.tratamiento
    ) {

      mostrarModal("Complete todos los campos obligatorios");
      return;
    }

    try {

      await axios.post(
        "http://localhost:4000/api/historial",
        formData
      );

      mostrarModal("Atención registrada correctamente");

      obtenerHistorial();

      setFormData({
        mascota: "",
        doctor: "",
        diagnostico: "",
        tratamiento: "",
        observaciones: "",
        peso: "",
        temperatura: "",
      });

    } catch (error) {

      console.log(error);

      mostrarModal("Error registrando atención");
    }
  };

  // =========================================
  // IMPRIMIR PDF
  // =========================================

  const imprimirPDF = () => {

    const doc = new jsPDF();

    // TITULO

    doc.setFontSize(24);
    doc.setTextColor(31, 67, 120);

    doc.text(
      "Historial Clínico Veterinario",
      14,
      20
    );

    doc.setFontSize(11);
    doc.setTextColor(90);

    doc.text(
      "Sistema de Gestión Veterinaria",
      14,
      30
    );

    // TABLA

    autoTable(doc, {

      startY: 40,

      head: [[
        "Mascota",
        "Doctor",
        "Diagnóstico",
        "Tratamiento",
        "Peso",
        "Temperatura",
        "Fecha"
      ]],

      body: historial.map((item) => [

        item.mascota,
        item.doctor,
        item.diagnostico,
        item.tratamiento,
        item.peso,
        item.temperatura,
        item.fecha

      ]),

      headStyles: {
        fillColor: [31, 67, 120]
      },

      styles: {
        fontSize: 10,
        cellPadding: 4,
      }

    });

    doc.save("historial_clinico.pdf");
  };

  // =========================================
  // CONFIRMAR ELIMINAR
  // =========================================

  const confirmarEliminar = (id) => {

    setRegistroEliminar(id);
    setMostrarConfirmacion(true);

  };

  // =========================================
  // ELIMINAR REGISTRO
  // =========================================

  const eliminarRegistro = async () => {

    try {

      await axios.delete(
        `http://localhost:4000/api/historial/${registroEliminar}`
      );

      obtenerHistorial();

      setMostrarConfirmacion(false);

      mostrarModal("Registro eliminado correctamente");

    } catch (error) {

      console.log(error);

      mostrarModal("Error eliminando registro");
    }
  };

  return (

    <div className="historial-container">

      {/* ========================================= */}
      {/* TITULO */}
      {/* ========================================= */}

      <h1 className="titulo-historial">
        🩺 Gestión Historial Clínico
      </h1>

      <p className="subtitulo-historial">
        Registro médico veterinario
      </p>

      {/* ========================================= */}
      {/* MODAL MENSAJES */}
      {/* ========================================= */}

      {mostrarMensaje && (

        <div className="modal-overlay">

          <div className="modal-confirmacion">

            <h2>Sistema Veterinario</h2>

            <p>{mensaje}</p>

            <button
              onClick={() =>
                setMostrarMensaje(false)
              }
            >
              Aceptar
            </button>

          </div>

        </div>

      )}

      {/* ========================================= */}
      {/* MODAL ELIMINAR */}
      {/* ========================================= */}

      {mostrarConfirmacion && (

        <div className="modal-overlay">

          <div className="modal-confirmacion">

            <h2>Confirmar Eliminación</h2>

            <p>
              ¿Desea eliminar este registro?
            </p>

            <div className="modal-botones">

              <button
                className="btn-confirmar"
                onClick={eliminarRegistro}
              >
                Eliminar
              </button>

              <button
                className="btn-cancelar"
                onClick={() =>
                  setMostrarConfirmacion(false)
                }
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ========================================= */}
      {/* FORMULARIO */}
      {/* ========================================= */}

      <div className="card-historial">

        <div className="form-grid">

          {/* MASCOTA */}

          <select
            name="mascota"
            value={formData.mascota}
            onChange={handleChange}
          >

            <option value="">
              Seleccione Mascota
            </option>

            {mascotas.map((item) => (

              <option
                key={item.id}
                value={item.nombre}
              >
                {item.nombre}
              </option>

            ))}

          </select>

          {/* DOCTOR */}

          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
          >

            <option value="">
              Seleccione Doctor
            </option>

            {doctores.map((item) => (

              <option
                key={item.id}
                value={item.nombre}
              >
                {item.nombre}
              </option>

            ))}

          </select>

          {/* DIAGNOSTICO */}

          <input
            type="text"
            name="diagnostico"
            placeholder="Diagnóstico"
            value={formData.diagnostico}
            onChange={handleChange}
          />

          {/* TRATAMIENTO */}

          <input
            type="text"
            name="tratamiento"
            placeholder="Tratamiento"
            value={formData.tratamiento}
            onChange={handleChange}
          />

          {/* PESO */}

          <input
            type="text"
            name="peso"
            placeholder="Peso"
            value={formData.peso}
            onChange={handleChange}
          />

          {/* TEMPERATURA */}

          <input
            type="text"
            name="temperatura"
            placeholder="Temperatura"
            value={formData.temperatura}
            onChange={handleChange}
          />

        </div>

        {/* OBSERVACIONES */}

        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />

        {/* ========================================= */}
        {/* BOTONES */}
        {/* ========================================= */}

        <div className="acciones-botones">

          <button
            className="btn-registrar"
            onClick={registrarHistorial}
          >
            Registrar Atención
          </button>

          <button
            className="btn-imprimir"
            onClick={imprimirPDF}
          >
            Imprimir PDF
          </button>

        </div>

      </div>

      {/* ========================================= */}
      {/* TABLA */}
      {/* ========================================= */}

      <div className="tabla-container">

        <table className="tabla-historial">

          <thead>

            <tr>

              <th>ID</th>
              <th>Mascota</th>
              <th>Doctor</th>
              <th>Diagnóstico</th>
              <th>Tratamiento</th>
              <th>Peso</th>
              <th>Temperatura</th>
              <th>Fecha</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {historial.length > 0 ? (

              historial.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>
                  <td>{item.mascota}</td>
                  <td>{item.doctor}</td>
                  <td>{item.diagnostico}</td>
                  <td>{item.tratamiento}</td>
                  <td>{item.peso}</td>
                  <td>{item.temperatura}</td>
                  <td>
                  {new Date(item.fecha).toLocaleDateString("es-PE")}
                  </td>

                  <td>

                    <button
                      className="btn-eliminar"
                      onClick={() =>
                        confirmarEliminar(item.id)
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="9">
                  No existen registros clínicos
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default HistorialClinico;