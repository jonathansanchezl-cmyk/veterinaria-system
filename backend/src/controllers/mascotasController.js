const Mascota = require("../models/Mascota");

// ======================================
// OBTENER TODAS
// ======================================

const obtenerMascotas = async (req, res) => {

    try {

        const { cliente } = req.query;

        const where = {};

        if (cliente) {

            where.id_cliente = cliente;

        }

        const mascotas = await Mascota.findAll({

            where,

            order: [

                ["nombre", "ASC"]

            ]

        });

        res.json(mascotas);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo mascotas"

        });

    }

};

// ======================================
// OBTENER UNA
// ======================================

const obtenerMascota = async (req, res) => {

    try {

        const mascota = await Mascota.findByPk(

            req.params.id

        );

        if (!mascota) {

            return res.status(404).json({

                error: "Mascota no encontrada"

            });

        }

        res.json(mascota);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo mascota"

        });

    }

};

// ======================================
// CREAR
// ======================================

const crearMascota = async (req, res) => {

    try {

        const mascota = await Mascota.create(

            req.body

        );

        res.status(201).json(

            mascota

        );

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error creando mascota"

        });

    }

};

// ======================================
// ACTUALIZAR
// ======================================

const actualizarMascota = async (req, res) => {

    try {

        const mascota = await Mascota.findByPk(

            req.params.id

        );

        if (!mascota) {

            return res.status(404).json({

                error: "Mascota no encontrada"

            });

        }

        await mascota.update(

            req.body

        );

        res.json(

            mascota

        );

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error actualizando mascota"

        });

    }

};

// ======================================
// ELIMINAR
// ======================================

const eliminarMascota = async (req, res) => {

    try {

        const mascota = await Mascota.findByPk(

            req.params.id

        );

        if (!mascota) {

            return res.status(404).json({

                error: "Mascota no encontrada"

            });

        }

        await mascota.destroy();

        res.json({

            mensaje: "Mascota eliminada correctamente"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error eliminando mascota"

        });

    }

};

module.exports = {

    obtenerMascotas,

    obtenerMascota,

    crearMascota,

    actualizarMascota,

    eliminarMascota

};