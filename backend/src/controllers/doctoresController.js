const Doctor =
require("../models/Doctor");

// ======================================
// OBTENER DOCTORES
// ======================================

const obtenerDoctores =
async (req, res) => {

  try {

    const doctores =
      await Doctor.findAll({

        order: [
          ["id", "DESC"]
        ]

      });

    res.json(
      doctores
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      mensaje:
        "Error obteniendo doctores"

    });

  }

};

// ======================================
// CREAR DOCTOR
// ======================================

const crearDoctor =
async (req, res) => {

  try {

    const doctor =
      await Doctor.create(
        req.body
      );

    res.json(
      doctor
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      mensaje:
        "Error creando doctor"

    });

  }

};

// ======================================
// ELIMINAR
// ======================================

const eliminarDoctor =
async (req, res) => {

  try {

    await Doctor.destroy({

      where: {

        id:
          req.params.id

      }

    });

    res.json({

      mensaje:
        "Doctor eliminado"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      mensaje:
        "Error eliminando doctor"

    });

  }

};

module.exports = {

  obtenerDoctores,
  crearDoctor,
  eliminarDoctor

};