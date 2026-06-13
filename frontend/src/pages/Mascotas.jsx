import { useEffect, useState }
from "react";

import axios
from "axios";

import Swal
from "sweetalert2";

import "./Mascotas.css";

function Mascotas() {

  // ======================================
  // STATES
  // ======================================

  const [mascotas, setMascotas] =
    useState([]);

  const [clientes, setClientes] =
    useState([]);

  const [formData, setFormData] =
    useState({

      nombre: "",

      especie: "🐶 Perro",

      raza: "",

      edad: "",

      sexo: "Macho",

      propietario: "",

      foto: ""

    });

  // ======================================
  // OBTENER MASCOTAS
  // ======================================

  const obtenerMascotas =
    async () => {

      try {

        const response =
          await axios.get(

            "http://localhost:4000/api/mascotas"

          );

        setMascotas(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

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

        console.log(
          response.data
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

    obtenerMascotas();

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
  // GUARDAR MASCOTA
  // ======================================

  const guardarMascota =
    async () => {

      // VALIDACIONES

      if (

        !formData.nombre ||

        !formData.raza ||

        !formData.edad ||

        !formData.propietario

      ) {

        Swal.fire({

          title:
            "Campos obligatorios",

          text:
            "Complete todos los campos",

          icon:
            "warning"

        });

        return;

      }

      try {

        await axios.post(

          "http://localhost:4000/api/mascotas",

          formData

        );

        Swal.fire({

          title:
            "Mascota registrada",

          text:
            "La mascota fue registrada correctamente",

          icon:
            "success",

          timer: 2000,

          showConfirmButton: false

        });

        setFormData({

          nombre: "",

          especie: "🐶 Perro",

          raza: "",

          edad: "",

          sexo: "Macho",

          propietario: "",

          foto: ""

        });

        obtenerMascotas();

      } catch (error) {

        console.log(error);

        Swal.fire({

          title:
            "Error",

          text:
            "No se pudo registrar la mascota",

          icon:
            "error"

        });

      }

    };

  // ======================================
  // ELIMINAR MASCOTA
  // ======================================

  const eliminarMascota =
    async (id) => {

      const resultado =
        await Swal.fire({

          title:
            "Confirmar eliminación",

          text:
            "¿Desea eliminar esta mascota?",

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

      if (!resultado.isConfirmed) {

        return;

      }

      try {

        await axios.delete(

          `http://localhost:4000/api/mascotas/${id}`

        );

        Swal.fire({

          title:
            "Mascota eliminada",

          text:
            "La mascota fue eliminada correctamente",

          icon:
            "success",

          timer: 2000,

          showConfirmButton: false

        });

        obtenerMascotas();

      } catch (error) {

        console.log(error);

        Swal.fire({

          title:
            "Error",

          text:
            "No se pudo eliminar la mascota",

          icon:
            "error"

        });

      }

    };

  // ======================================
  // RENDER
  // ======================================

  return (

    <div className="mascotas-container">

      {/* HEADER */}

      <div className="header">

        <h1>
          🐾 Gestión de Mascotas
        </h1>

        <p>
          Administración de mascotas registradas
        </p>

      </div>

      {/* FORMULARIO */}

      <div className="formulario">

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        {/* ESPECIE */}

        <select
          name="especie"
          value={formData.especie}
          onChange={handleChange}
        >

          <option value="🐶 Perro">
            🐶 Perro
          </option>

          <option value="🐱 Gato">
            🐱 Gato
          </option>

          <option value="🐰 Conejo">
            🐰 Conejo
          </option>

          <option value="🐹 Hamster">
            🐹 Hamster
          </option>

          <option value="🐦 Ave">
            🐦 Ave
          </option>

        </select>

        {/* RAZA */}

        <input
          type="text"
          name="raza"
          placeholder="Raza"
          value={formData.raza}
          onChange={handleChange}
        />

        {/* EDAD */}

        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
        />

        {/* SEXO */}

        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
        >

          <option value="Macho">
            Macho
          </option>

          <option value="Hembra">
            Hembra
          </option>

        </select>

        {/* PROPIETARIO */}

        <select
          name="propietario"
          value={formData.propietario}
          onChange={handleChange}
        >

          <option value="">
            Seleccione Propietario
          </option>

          {
            clientes.length > 0 &&

            clientes.map((cliente) => (

              <option
                key={cliente.id}
                value={cliente.nombre}
              >

                {cliente.nombre}

              </option>

            ))
          }

        </select>

        {/* FOTO */}

        <input
          type="text"
          name="foto"
          placeholder="URL Foto Mascota"
          value={formData.foto}
          onChange={handleChange}
        />

        {/* BOTON */}

        <button
          onClick={guardarMascota}
        >
          Guardar Mascota
        </button>

      </div>

      {/* TABLA */}

      <div className="tabla-container">

        <table>

          <thead>

            <tr>

              <th>Foto</th>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Propietario</th>
              <th>Estado</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {
              mascotas.length > 0 ? (

                mascotas.map((mascota) => (

                  <tr key={mascota.id}>

                    <td>

                      <img
                        src={
                          mascota.foto ||
                          "https://cdn-icons-png.flaticon.com/512/616/616408.png"
                        }
                        alt="mascota"
                        className="foto-mascota"
                      />

                    </td>

                    <td>
                      {mascota.nombre}
                    </td>

                    <td>
                      {mascota.especie}
                    </td>

                    <td>
                      {mascota.raza}
                    </td>

                    <td>
                      {mascota.edad}
                    </td>

                    <td>
                      {mascota.sexo}
                    </td>

                    <td>
                      {mascota.propietario}
                    </td>

                    <td>

                      <span className="estado">
                        ACTIVO
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn-eliminar"
                        onClick={() =>
                          eliminarMascota(
                            mascota.id
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
                    colSpan="9"
                    className="sin-datos"
                  >

                    No existen mascotas registradas

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

export default Mascotas;