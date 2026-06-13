import { useEffect, useState }
from "react";

import axios
from "axios";

import "./Operadores.css";

import Swal
from "sweetalert2";

function Operadores() {

  // ======================================
  // STATES
  // ======================================

  const [operadores, setOperadores] =
    useState([]);

  const [mensaje, setMensaje] =
    useState("");

  const [tipoMensaje, setTipoMensaje] =
    useState("");

  const [formData, setFormData] =
    useState({

      nombre: "",
      email: "",
      password: "",
      rol: "Recepcionista"

    });

  // ======================================
  // OBTENER OPERADORES
  // ======================================

  const obtenerOperadores =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:4000/api/operadores"
          );

        setOperadores(
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

    obtenerOperadores();

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
  // MOSTRAR MENSAJE
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
  // GUARDAR
  // ======================================

  const guardarOperador =
    async () => {

      // VALIDACION

      if (

        !formData.nombre ||

        !formData.email ||

        !formData.password

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

          "http://localhost:4000/api/operadores",

          formData

        );

        mostrarMensaje(

          "Operador registrado correctamente",

          "success"

        );

        setFormData({

          nombre: "",
          email: "",
          password: "",
          rol: "Recepcionista"

        });

        obtenerOperadores();

      } catch (error) {

        console.log(error);

        mostrarMensaje(

          "Error registrando operador",

          "error"

        );

      }

    };

  // ======================================
  // ELIMINAR
  // ======================================

  const eliminarOperador =
  async (id) => {

    // ======================================
    // ALERTA MODERNA
    // ======================================

    const resultado =
      await Swal.fire({

        title:
          "Confirmar eliminación",

        text:
          "¿Desea eliminar este operador?",

        icon:
          "warning",

        showCancelButton: true,

        confirmButtonColor:
          "#dc3545",

        cancelButtonColor:
          "#6c757d",

        confirmButtonText:
          "Sí, eliminar",

        cancelButtonText:
          "Cancelar"

      });

    // ======================================
    // CANCELAR
    // ======================================

    if (!resultado.isConfirmed) {

      return;

    }

    // ======================================
    // ELIMINAR
    // ======================================

    try {

      await axios.delete(

        `http://localhost:4000/api/operadores/${id}`

      );

      Swal.fire({

        title:
          "Eliminado",

        text:
          "Operador eliminado correctamente",

        icon:
          "success",

        timer: 2000,

        showConfirmButton: false

      });

      obtenerOperadores();

    } catch (error) {

      console.log(error);

      Swal.fire({

        title:
          "Error",

        text:
          "No se pudo eliminar el operador",

        icon:
          "error"

      });

    }

  };


  // ======================================
  // RENDER
  // ======================================

  return (

    <div className="operadores-container">

      {/* HEADER */}

      <div className="header">

        <h1>
          👥 Gestión de Operadores
        </h1>

        <p>
          Administración de usuarios del sistema veterinario
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
          placeholder="Nombre Completo"
          value={formData.nombre}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
        >

          <option>
            Administrador
          </option>

          <option>
            Veterinario
          </option>

          <option>
            Recepcionista
          </option>

          <option>
            Asistente
          </option>

        </select>

        <button
          onClick={guardarOperador}
        >
          Guardar Operador
        </button>

      </div>

      {/* TABLA */}

      <div className="tabla-container">

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {
              operadores.length > 0 ? (

                operadores.map((operador) => (

                  <tr key={operador.id}>

                    <td>
                      {operador.id}
                    </td>

                    <td>
                      {operador.nombre}
                    </td>

                    <td>
                      {operador.email}
                    </td>

                    <td>
                      {operador.rol}
                    </td>

                    <td>

                      <span
                        className="estado-activo"
                      >
                        ACTIVO
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn-eliminar"
                        onClick={() =>
                          eliminarOperador(
                            operador.id
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
                    colSpan="6"
                    className="sin-datos"
                  >

                    No existen operadores registrados

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

export default Operadores;