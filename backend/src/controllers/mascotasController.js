const Mascota = require("../models/Mascota");

// ======================================================
// OBTENER MASCOTAS
// ======================================================

const obtenerMascotas = async (req, res) => {

    try {

        const { cliente } = req.query;

        const where = {};

        // Filtrar por cliente si viene el parámetro
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


// ======================================================
// CREAR MASCOTA
// ======================================================

const crearMascota = async (req, res) => {

    try {

        const mascota = await Mascota.create(req.body);

        res.status(201).json(mascota);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error creando mascota"

        });

    }

};


// ======================================================
// ELIMINAR MASCOTA
// ======================================================

const eliminarMascota = async (req, res) => {

    try {

        const eliminadas = await Mascota.destroy({

            where: {

                id: req.params.id

            }

        });

        if (!eliminadas) {

            return res.status(404).json({

                error: "Mascota no encontrada"

            });

        }

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

    crearMascota,

    eliminarMascota

};