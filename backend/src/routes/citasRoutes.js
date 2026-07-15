const express = require("express");

const router = express.Router();

const {

    obtenerCitas,

    obtenerCitaPorId,

    crearCita,

    actualizarCita,

    eliminarCita

} = require("../controllers/citasController");


// ======================================
// LISTAR TODAS LAS CITAS
// ======================================

router.get("/", obtenerCitas);


// ======================================
// OBTENER UNA CITA
// ======================================

router.get("/:id", obtenerCitaPorId);


// ======================================
// CREAR
// ======================================

router.post("/", crearCita);


// ======================================
// ACTUALIZAR
// ======================================

router.put("/:id", actualizarCita);


// ======================================
// ELIMINAR
// ======================================

router.delete("/:id", eliminarCita);


module.exports = router;
