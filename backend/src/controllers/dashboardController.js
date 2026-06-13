const Cita =
require("../models/Cita");

const { Op } =
require("sequelize");

// ======================================
// DASHBOARD
// ======================================

const obtenerDashboard =
async (req, res) => {

  try {

    // FECHA ACTUAL

    const hoy =
      new Date()
      .toLocaleDateString(
        "en-CA"
      );

    // ======================================
    // CITAS DEL DIA
    // ======================================

    const citasHoy =
      await Cita.findAll({

        where: {
          fecha: hoy
        },

        order: [
          ["hora", "ASC"]
        ]

      });

    // ======================================
    // TOTAL CITAS
    // ======================================

    const totalCitas =
      citasHoy.length;

    // ======================================
    // INGRESOS
    // ======================================

    let ingresos = 0;

    citasHoy.forEach(
      (cita) => {

        ingresos +=
          Number(
            cita.costo || 0
          );

      }
    );

    // ======================================
    // PROXIMA CITA
    // ======================================

    const ahora =
      new Date();

    const horaActual =
      ahora.toLocaleTimeString(
        "en-GB",
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      );

    const proxima =
      await Cita.findOne({

        where: {

          fecha: hoy,

          hora: {
            [Op.gte]:
              horaActual
          }

        },

        order: [
          ["hora", "ASC"]
        ]

      });

    // ======================================
    // RESPUESTA
    // ======================================

    res.json({

      citasHoy:
        totalCitas,

      ingresos,

      noAtendidas:
        totalCitas,

      proxima

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Error dashboard"
    });

  }

};

// ======================================
// EXPORTAR
// ======================================

module.exports = {

  obtenerDashboard

};