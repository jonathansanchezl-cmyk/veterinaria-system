const express = require("express");
const router = express.Router();

const sequelize = require("../config/database");

const { QueryTypes } = require("sequelize");


// ==========================================
// OBTENER HISTORIAL
// ==========================================

router.get("/", async (req, res) => {

  try {

    const historial = await sequelize.query(
      `
      SELECT *
      FROM historial_clinico
      ORDER BY id DESC
      `,
      {
        type: QueryTypes.SELECT
      }
    );

    res.json(historial);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error obteniendo historial"
    });

  }

});


// ==========================================
// REGISTRAR ATENCIÓN
// ==========================================

router.post("/", async (req, res) => {

  try {

    const {
      mascota,
      doctor,
      diagnostico,
      tratamiento,
      observaciones,
      peso,
      temperatura
    } = req.body;

    await sequelize.query(
      `
      INSERT INTO historial_clinico
      (
        mascota,
        doctor,
        diagnostico,
        tratamiento,
        observaciones,
        peso,
        temperatura
      )
      VALUES
      (
        :mascota,
        :doctor,
        :diagnostico,
        :tratamiento,
        :observaciones,
        :peso,
        :temperatura
      )
      `,
      {
        replacements: {
          mascota,
          doctor,
          diagnostico,
          tratamiento,
          observaciones,
          peso,
          temperatura
        },
        type: QueryTypes.INSERT
      }
    );

    res.json({
      success: true,
      message: "Atención registrada correctamente"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: "Error registrando atención"
    });

  }

});


// ==========================================
// ELIMINAR
// ==========================================

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await sequelize.query(
      `
      DELETE FROM historial_clinico
      WHERE id = :id
      `,
      {
        replacements: { id },
        type: QueryTypes.DELETE
      }
    );

    res.json({
      success: true
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: "Error eliminando historial"
    });

  }

});


module.exports = router;