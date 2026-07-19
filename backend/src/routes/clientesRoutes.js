const express = require("express");

const router = express.Router();

const {

    obtenerClientes,

    obtenerCliente,

    crearCliente,

    actualizarCliente,

    eliminarCliente

} = require("../controllers/clientesController");

// ======================================
// LISTAR TODOS
// ======================================

router.get(

    "/",

    obtenerClientes

);

// ======================================
// OBTENER UNO
// ======================================

router.get(

    "/:id",

    obtenerCliente

);

// ======================================
// CREAR
// ======================================

router.post(

    "/",

    crearCliente

);

// ======================================
// ACTUALIZAR
// ======================================

router.put(

    "/:id",

    actualizarCliente

);

// ======================================
// ELIMINAR
// ======================================

router.delete(

    "/:id",

    eliminarCliente

);

module.exports = router;
