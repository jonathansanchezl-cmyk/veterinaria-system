const Cliente =
  require("../models/Cliente");

// ======================================
// OBTENER CLIENTES
// ======================================

const obtenerClientes =
  async (req, res) => {

    try {

      const clientes =
        await Cliente.findAll({

          order: [["nombre", "ASC"]]

        });

      res.json(clientes);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Error obteniendo clientes"

      });

    }

  };

// ======================================
// CREAR CLIENTE
// ======================================

const crearCliente =
  async (req, res) => {

    try {

      const cliente =
        await Cliente.create(

          req.body

        );

      res.json(cliente);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Error creando cliente"

      });

    }

  };

// ======================================
// ELIMINAR CLIENTE
// ======================================

const eliminarCliente =
  async (req, res) => {

    try {

      await Cliente.destroy({

        where: {

          id:
            req.params.id

        }

      });

      res.json({

        mensaje:
          "Cliente eliminado"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Error eliminando cliente"

      });

    }

  };

module.exports = {

  obtenerClientes,

  crearCliente,

  eliminarCliente

};