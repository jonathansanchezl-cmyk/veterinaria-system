const express =
require("express");

const router =
express.Router();

const {

  obtenerDoctores,
  crearDoctor,
  eliminarDoctor

} = require(
  "../controllers/doctoresController"
);

// ======================================
// RUTAS
// ======================================

router.get(
  "/",
  obtenerDoctores
);

router.post(
  "/",
  crearDoctor
);

router.delete(
  "/:id",
  eliminarDoctor
);

module.exports =
router;