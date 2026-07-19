const express = require("express");

const router = express.Router();

const {

    obtenerMascotas,

    obtenerMascota,

    crearMascota,

    actualizarMascota,

    eliminarMascota

} = require("../controllers/mascotasController");

// ======================================
// LISTAR TODAS
// ======================================

router.get(

    "/",

    obtenerMascotas

);

// ======================================
// OBTENER UNA
// ======================================

router.get(

    "/:id",

    obtenerMascota

);

// ======================================
// CREAR
// ======================================

router.post(

    "/",

    crearMascota

);

// ======================================
// ACTUALIZAR
// ======================================

router.put(

    "/:id",

    actualizarMascota

);

// ======================================
// ELIMINAR
// ======================================

router.delete(

    "/:id",

    eliminarMascota

);

module.exports = router;
