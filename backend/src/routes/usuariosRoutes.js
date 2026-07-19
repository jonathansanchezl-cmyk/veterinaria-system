const express = require("express");

const router = express.Router();

const {

    obtenerUsuarios,

    obtenerUsuario,

    crearUsuario,

    actualizarUsuario,

    eliminarUsuario

} = require("../controllers/usuariosController");

// ======================================
// OBTENER TODOS
// ======================================

router.get(

    "/",

    obtenerUsuarios

);

// ======================================
// OBTENER UNO
// ======================================

router.get(

    "/:id",

    obtenerUsuario

);

// ======================================
// CREAR
// ======================================

router.post(

    "/",

    crearUsuario

);

// ======================================
// ACTUALIZAR
// ======================================

router.put(

    "/:id",

    actualizarUsuario

);

// ======================================
// ELIMINAR
// ======================================

router.delete(

    "/:id",

    eliminarUsuario

);

module.exports = router;
