const Cita =
require("../models/Cita");

// ======================================
// OBTENER CITAS
// ======================================

const obtenerCitas =
async (req, res) => {

  try {

    const citas =
      await Cita.findAll({

        order: [
          ["fecha", "ASC"],
          ["hora", "ASC"]
        ]

      });

    res.json(citas);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error obteniendo citas"
    });

  }

};

// ======================================
// CREAR CITA
// ======================================

const crearCita =
async (req, res) => {

  try {

    const nuevaCita =
      await Cita.create({

        mascota:
          req.body.mascota,

        propietario:
          req.body.propietario,

        doctor:
          req.body.doctor,

        fecha:
          req.body.fecha,

        hora:
          req.body.hora,

        motivo:
          req.body.motivo,

        estado:
          req.body.estado,

        costo:
          req.body.costo

      });

    res.json(
      nuevaCita
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error creando cita"
    });

  }

};

// ======================================
// ELIMINAR CITA
// ======================================

const eliminarCita =
async (req, res) => {

  try {

    await Cita.destroy({

      where: {
        id:
          req.params.id
      }

    });

    res.json({
      mensaje:
        "Cita eliminada"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error eliminando cita"
    });

  }

};

// ======================================
// EXPORTAR
// ======================================

module.exports = {

  obtenerCitas,

  crearCita,

  eliminarCita

};