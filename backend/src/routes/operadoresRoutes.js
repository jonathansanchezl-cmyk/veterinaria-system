const express =
require("express");

const router =
express.Router();

const {

  obtenerOperadores,
  crearOperador,
  eliminarOperador

} = require(
  "../controllers/operadoresController"
);

router.get(
  "/",
  obtenerOperadores
);

router.post(
  "/",
  crearOperador
);

router.delete(
  "/:id",
  eliminarOperador
);

module.exports =
router;