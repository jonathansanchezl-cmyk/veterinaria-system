import { useEffect, useState }
from "react";

import axios
from "axios";

import "./Clientes.css";
import Swal from "sweetalert2";


function Clientes() {

  // ======================================
  // STATES
  // ======================================

  const [clientes, setClientes] =
    useState([]);

  const [mensaje, setMensaje] =
    useState("");

  const [tipoMensaje, setTipoMensaje] =
    useState("");

  const [formData, setFormData] =
    useState({

      nombre: "",
      dni: "",
      telefono: "",
      email: "",
      direccion: ""

    });

  // ======================================
  // OBTENER CLIENTES
  // ======================================

  const obtenerClientes =
    async () => {

      try {

        const response =
          await axios.get(

            "http://localhost:4000/api/clientes"

          );

        setClientes(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ======================================
  // USE EFFECT
  // ======================================

  useEffect(() => {

    obtenerClientes();

  }, []);

  // ======================================
  // HANDLE CHANGE
  // ======================================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  // ======================================
  // MENSAJES
  // ======================================

  const mostrarMensaje =
    (texto, tipo) => {

      setMensaje(texto);

      setTipoMensaje(tipo);

      setTimeout(() => {

        setMensaje("");

      }, 3000);

    };

  // ======================================
  // VALIDAR EMAIL
  // ======================================

  const validarEmail =
    (email) => {

      return /\S+@\S+\.\S+/
        .test(email);

    };

  // ======================================
  // GUARDAR CLIENTE
  // ======================================

  const guardarCliente =
    async () => {

      // VALIDACIONES

      if (

        !formData.nombre ||

        !formData.dni ||

        !formData.telefono ||

        !formData.email

      ) {

        mostrarMensaje(

          "Todos los campos son obligatorios",

          "error"

        );

        return;

      }

      // VALIDAR EMAIL

      if (

        !validarEmail(
          formData.email
        )

      ) {

        mostrarMensaje(

          "Correo inválido",

          "error"

        );

        return;

      }

      try {

        await axios.post(

          "http://localhost:4000/api/clientes",

          formData

        );

        mostrarMensaje(

          "Cliente registrado correctamente",

          "success"

        );

        setFormData({

          nombre: "",
          dni: "",
          telefono: "",
          email: "",
          direccion: ""

        });

        obtenerClientes();

      } catch (error) {

        console.log(error);

        mostrarMensaje(

          "Error registrando cliente",

          "error"

        );

      }

    };

  // ======================================
  // ELIMINAR CLIENTE
  // ======================================

  const eliminarCliente =
  async (id) => {

    // ======================================
    // CONFIRMACION MODERNA
    // ======================================

    const resultado =
      await Swal.fire({

        title:
          "Confirmar eliminación",

        text:
          "¿Desea eliminar este cliente?",

        icon:
          "warning",

        showCancelButton: true,

        confirmButtonColor:
          "#ef4444",

        cancelButtonColor:
          "#6b7280",

        confirmButtonText:
          "Sí, eliminar",

        cancelButtonText:
          "Cancelar"

      });

    // CANCELAR

    if (!resultado.isConfirmed) {

      return;

    }

    // ======================================
    // ELIMINAR
    // ======================================

    try {

      await axios.delete(

        `http://localhost:4000/api/clientes/${id}`

      );

      Swal.fire({

        title:
          "Cliente eliminado",

        text:
          "El cliente fue eliminado correctamente",

        icon:
          "success",

        timer: 2000,

        showConfirmButton: false

      });

      obtenerClientes();

    } catch (error) {

      console.log(error);

      Swal.fire({

        title:
          "Error",

        text:
          "No se pudo eliminar el cliente",

        icon:
          "error"

      });

    }

  };
  
  // ======================================
  // RENDER
  // ======================================

  return (

    <div className="clientes-container">

      {/* HEADER */}

      <div className="header">

        <h1>
          👨‍👩‍👧 Gestión de Clientes
        </h1>

        <p>
          Administración de propietarios de mascotas
        </p>

      </div>

      {/* MENSAJES */}

      {
        mensaje && (

          <div
            className={`mensaje ${tipoMensaje}`}
          >

            {mensaje}

          </div>

        )
      }

      {/* FORMULARIO */}

      <div className="formulario">

        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
        />

        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
        />

        <button
          onClick={guardarCliente}
        >
          Guardar Cliente
        </button>

      </div>

      {/* TABLA */}

      <div className="tabla-container">

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {
              clientes.length > 0 ? (

                clientes.map((cliente) => (

                  <tr key={cliente.id}>

                    <td>
                      {cliente.id}
                    </td>

                    <td>
                      {cliente.nombre}
                    </td>

                    <td>
                      {cliente.dni}
                    </td>

                    <td>
                      {cliente.telefono}
                    </td>

                    <td>
                      {cliente.email}
                    </td>

                    <td>
                      {cliente.direccion}
                    </td>

                    <td>

                      <button
                        className="btn-eliminar"
                        onClick={() =>
                          eliminarCliente(
                            cliente.id
                          )
                        }
                      >
                        Eliminar
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="sin-datos"
                  >

                    No existen clientes registrados

                  </td>

                </tr>

              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Clientes;