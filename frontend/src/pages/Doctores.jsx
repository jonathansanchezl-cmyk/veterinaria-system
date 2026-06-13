import { useEffect, useState }
from "react";

import axios
from "axios";

import "./Doctores.css";

function Doctores() {

  // ======================================
  // STATES
  // ======================================

  const [doctores, setDoctores] =
    useState([]);

  const [formData, setFormData] =
    useState({

      nombres: "",
      especialidad: "",
      telefono: "",
      correo: "",
      horario: "",
      estado: "ACTIVO"

    });

  // ======================================
  // OBTENER
  // ======================================

  const obtenerDoctores =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:4000/api/doctores"
          );

        setDoctores(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    obtenerDoctores();

  }, []);

  // ======================================
  // CHANGE
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
  // REGISTRAR
  // ======================================

  const guardarDoctor =
    async () => {

      try {

        await axios.post(

          "http://localhost:4000/api/doctores",

          formData

        );

        obtenerDoctores();

        setFormData({

          nombres: "",
          especialidad: "",
          telefono: "",
          correo: "",
          horario: "",
          estado: "ACTIVO"

        });

      } catch (error) {

        console.log(error);

      }

    };

  // ======================================
  // ELIMINAR
  // ======================================

  const eliminarDoctor =
    async (id) => {

      try {

        await axios.delete(

          `http://localhost:4000/api/doctores/${id}`

        );

        obtenerDoctores();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="doctores-container">

      {/* HEADER */}

      <div className="header">

        <h1>
          👨‍⚕️ Gestión de Doctores
        </h1>

        <p>
          Administración de médicos veterinarios
        </p>

      </div>

      {/* FORM */}

      <div className="formulario">

        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
        />

        <input
          type="text"
          name="especialidad"
          placeholder="Especialidad"
          value={formData.especialidad}
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
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="horario"
          placeholder="Horario"
          value={formData.horario}
          onChange={handleChange}
        />

        <button
          onClick={guardarDoctor}
        >
          Guardar Doctor
        </button>

      </div>

      {/* TABLA */}

      <div className="tabla-container">

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Nombres</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {
              doctores.map((doctor) => (

                <tr key={doctor.id}>

                  <td>{doctor.id}</td>

                  <td>{doctor.nombres}</td>

                  <td>{doctor.especialidad}</td>

                  <td>{doctor.telefono}</td>

                  <td>{doctor.correo}</td>

                  <td>{doctor.horario}</td>

                  <td>{doctor.estado}</td>

                  <td>

                    <button
                      className="btn-eliminar"
                      onClick={() =>
                        eliminarDoctor(
                          doctor.id
                        )
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Doctores;