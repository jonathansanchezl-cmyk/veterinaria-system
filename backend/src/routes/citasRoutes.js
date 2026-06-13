const express =
require("express");

const router =
express.Router();

const {

  obtenerCitas,

  crearCita,

  eliminarCita

} = require(
  "../controllers/citasController"
);

// ======================================
// RUTAS CITAS
// ======================================

// OBTENER

router.get(
  "/",
  obtenerCitas
);

// CREAR

router.post(
  "/",
  crearCita
);

// ELIMINAR

router.delete(
  "/:id",
  eliminarCita
);

module.exports =
router;