const Operador =
require("../models/Operador");

// ======================================
// OBTENER
// ======================================

const obtenerOperadores =
async (req, res) => {

  try {

    const operadores =
      await Operador.findAll({

        order: [
          ["id", "DESC"]
        ]

      });

    res.json(
      operadores
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Error obteniendo operadores"

    });

  }

};

// ======================================
// CREAR
// ======================================

const crearOperador =
async (req, res) => {

  try {

    const operador =
      await Operador.create(
        req.body
      );

    res.json(
      operador
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Error creando operador"

    });

  }

};

// ======================================
// ELIMINAR
// ======================================

const eliminarOperador =
async (req, res) => {

  try {

    await Operador.destroy({

      where: {

        id:
          req.params.id

      }

    });

    res.json({

      mensaje:
        "Operador eliminado"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Error eliminando operador"

    });

  }

};

module.exports = {

  obtenerOperadores,
  crearOperador,
  eliminarOperador

};