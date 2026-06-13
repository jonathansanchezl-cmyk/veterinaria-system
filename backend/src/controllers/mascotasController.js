const Mascota =
require("../models/Mascota");

// ======================================
// OBTENER
// ======================================

const obtenerMascotas =
async (req, res) => {

  try {

    const mascotas =
      await Mascota.findAll({

        order: [
          ["id", "DESC"]
        ]

      });

    res.json(
      mascotas
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Error obteniendo mascotas"

    });

  }

};

// ======================================
// CREAR
// ======================================

const crearMascota =
async (req, res) => {

  try {

    const mascota =
      await Mascota.create(
        req.body
      );

    res.json(
      mascota
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Error creando mascota"

    });

  }

};

// ======================================
// ELIMINAR
// ======================================

const eliminarMascota =
async (req, res) => {

  try {

    await Mascota.destroy({

      where: {

        id:
          req.params.id

      }

    });

    res.json({

      mensaje:
        "Mascota eliminada"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Error eliminando mascota"

    });

  }

};

module.exports = {

  obtenerMascotas,
  crearMascota,
  eliminarMascota

};