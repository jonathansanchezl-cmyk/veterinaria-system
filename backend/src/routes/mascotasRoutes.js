const express =
require("express");

const router =
express.Router();

const {

  obtenerMascotas,
  crearMascota,
  eliminarMascota

} = require(
  "../controllers/mascotasController"
);

router.get(
  "/",
  obtenerMascotas
);

router.post(
  "/",
  crearMascota
);

router.delete(
  "/:id",
  eliminarMascota
);

module.exports =
router;