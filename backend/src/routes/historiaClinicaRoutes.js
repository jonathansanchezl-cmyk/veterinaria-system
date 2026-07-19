const express = require("express");

const router = express.Router();

const HistoriaClinicaController = require("../controllers/historiaClinicaController");

// Obtener historia clínica por mascota
router.get(
    "/:idMascota",
    HistoriaClinicaController.obtenerPorMascota
);

// Registrar atención médica
router.post(
    "/",
    HistoriaClinicaController.crear
);

// Actualizar atención
router.put(
    "/:id",
    HistoriaClinicaController.actualizar
);

// Eliminar atención
router.delete(
    "/:id",
    HistoriaClinicaController.eliminar
);

module.exports = router;