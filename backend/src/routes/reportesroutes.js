const express = require("express");

const router = express.Router();

const {

    obtenerReporte

} = require("../controllers/reportesController");

router.get(

    "/",

    obtenerReporte

);

module.exports = router;