const Doctor = require("../models/Doctor");

// ======================================
// OBTENER TODOS
// ======================================

const obtenerDoctores = async (req, res) => {

    try {

        const doctores = await Doctor.findAll({

            order: [

                ["nombres", "ASC"]

            ]

        });

        res.json(doctores);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo doctores"

        });

    }

};

// ======================================
// OBTENER UNO
// ======================================

const obtenerDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findByPk(

            req.params.id

        );

        if (!doctor) {

            return res.status(404).json({

                error: "Doctor no encontrado"

            });

        }

        res.json(doctor);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo doctor"

        });

    }

};

// ======================================
// CREAR
// ======================================

const crearDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.create(

            req.body

        );

        res.status(201).json(doctor);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error creando doctor"

        });

    }

};

// ======================================
// ACTUALIZAR
// ======================================

const actualizarDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findByPk(

            req.params.id

        );

        if (!doctor) {

            return res.status(404).json({

                error: "Doctor no encontrado"

            });

        }

        await doctor.update(

            req.body

        );

        res.json(doctor);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error actualizando doctor"

        });

    }

};

// ======================================
// ELIMINAR
// ======================================

const eliminarDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findByPk(

            req.params.id

        );

        if (!doctor) {

            return res.status(404).json({

                error: "Doctor no encontrado"

            });

        }

        await doctor.destroy();

        res.json({

            mensaje: "Doctor eliminado correctamente"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error eliminando doctor"

        });

    }

};

module.exports = {

    obtenerDoctores,

    obtenerDoctor,

    crearDoctor,

    actualizarDoctor,

    eliminarDoctor

};
