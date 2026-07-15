const {
    Cita,
    Cliente,
    Mascota,
    Doctor
} = require("../models");


// ======================================================
// OBTENER TODAS LAS CITAS
// ======================================================

const obtenerCitas = async (req, res) => {

    try {

        const citas = await Cita.findAll({

            include: [

                {
                    model: Cliente,
                    as: "cliente",
                    attributes: [
                        "id",
                        "nombre"
                    ]
                },

                {
                    model: Mascota,
                    as: "mascotaInfo",
                    attributes: [
                        "id",
                        "nombre",
                        "especie",
                        "raza"
                    ]
                },

                {
                    model: Doctor,
                    as: "doctorInfo",
                    attributes: [
                        "id",
                        "nombres",
                        "especialidad"
                    ]
                }

            ],

            order: [

                ["fecha", "ASC"],
                ["hora", "ASC"]

            ]

        });

        const resultado = citas.map((cita) => ({

            id: cita.id,

            id_cliente: cita.id_cliente,

            id_mascota: cita.id_mascota,

            id_doctor: cita.id_doctor,

            propietario:

                cita.cliente
                    ? cita.cliente.nombre
                    : cita.propietario,

            mascota:

                cita.mascotaInfo
                    ? cita.mascotaInfo.nombre
                    : cita.mascota,

            doctor:

                cita.doctorInfo
                    ? cita.doctorInfo.nombres
                    : cita.doctor,

            fecha: cita.fecha,

            hora: cita.hora,

            motivo: cita.motivo,

            estado: cita.estado,

            costo: cita.costo

        }));

        res.json(resultado);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo citas"

        });

    }

};
// ======================================================
// CREAR CITA
// ======================================================

const crearCita = async (req, res) => {

    try {

        let {

            id_cliente,
            id_mascota,
            id_doctor,

            propietario,
            mascota,
            doctor,

            fecha,
            hora,
            motivo,
            estado,
            costo

        } = req.body;

        // ==========================================
        // COMPATIBILIDAD CON EL FRONTEND ACTUAL
        // ==========================================

        if (!id_cliente && propietario) {

            const cliente = await Cliente.findOne({

                where: {

                    nombre: propietario

                }

            });

            if (cliente) {

                id_cliente = cliente.id;

            }

        }

        if (!id_mascota && mascota) {

            const mascotaDB = await Mascota.findOne({

                where: {

                    nombre: mascota

                }

            });

            if (mascotaDB) {

                id_mascota = mascotaDB.id;

            }

        }

        if (!id_doctor && doctor) {

            const doctorDB = await Doctor.findOne({

                where: {

                    nombres: doctor

                }

            });

            if (doctorDB) {

                id_doctor = doctorDB.id;

            }

        }

        // ==========================================
        // VALIDACIÓN
        // ==========================================

        if (

            !id_cliente ||

            !id_mascota ||

            !id_doctor

        ) {

            return res.status(400).json({

                error:

                    "Cliente, mascota o doctor no existen."

            });

        }

        const nuevaCita = await Cita.create({

            id_cliente,

            id_mascota,

            id_doctor,

            // Compatibilidad temporal
            propietario,
            mascota,
            doctor,

            fecha,

            hora,

            motivo,

            estado,

            costo

        });

        res.status(201).json(nuevaCita);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error creando la cita"

        });

    }

};

// ======================================================
// OBTENER CITA POR ID
// ======================================================

const obtenerCitaPorId = async (req, res) => {

    try {

        const cita = await Cita.findByPk(req.params.id, {

            include: [

                {
                    model: Cliente,
                    as: "cliente",
                    attributes: ["id", "nombre"]
                },

                {
                    model: Mascota,
                    as: "mascotaInfo",
                    attributes: [
                        "id",
                        "nombre",
                        "especie",
                        "raza"
                    ]
                },

                {
                    model: Doctor,
                    as: "doctorInfo",
                    attributes: [
                        "id",
                        "nombres",
                        "especialidad"
                    ]
                }

            ]

        });

        if (!cita) {

            return res.status(404).json({

                error: "Cita no encontrada"

            });

        }

        res.json({

            id: cita.id,

            id_cliente: cita.id_cliente,

            id_mascota: cita.id_mascota,

            id_doctor: cita.id_doctor,

            propietario:

                cita.cliente
                    ? cita.cliente.nombre
                    : cita.propietario,

            mascota:

                cita.mascotaInfo
                    ? cita.mascotaInfo.nombre
                    : cita.mascota,

            doctor:

                cita.doctorInfo
                    ? cita.doctorInfo.nombres
                    : cita.doctor,

            fecha: cita.fecha,

            hora: cita.hora,

            motivo: cita.motivo,

            estado: cita.estado,

            costo: cita.costo

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo la cita"

        });

    }

};


// ======================================================
// ACTUALIZAR CITA
// ======================================================

const actualizarCita = async (req, res) => {

    try {

        const cita = await Cita.findByPk(req.params.id);

        if (!cita) {

            return res.status(404).json({

                error: "Cita no encontrada"

            });

        }

        let {

            id_cliente,
            id_mascota,
            id_doctor,

            propietario,
            mascota,
            doctor,

            fecha,
            hora,
            motivo,
            estado,
            costo

        } = req.body;

        // ==========================================
        // COMPATIBILIDAD
        // ==========================================

        if (!id_cliente && propietario) {

            const cliente = await Cliente.findOne({

                where: {

                    nombre: propietario

                }

            });

            if (cliente) {

                id_cliente = cliente.id;

            }

        }

        if (!id_mascota && mascota) {

            const mascotaDB = await Mascota.findOne({

                where: {

                    nombre: mascota

                }

            });

            if (mascotaDB) {

                id_mascota = mascotaDB.id;

            }

        }

        if (!id_doctor && doctor) {

            const doctorDB = await Doctor.findOne({

                where: {

                    nombres: doctor

                }

            });

            if (doctorDB) {

                id_doctor = doctorDB.id;

            }

        }

        if (

            !id_cliente ||

            !id_mascota ||

            !id_doctor

        ) {

            return res.status(400).json({

                error:

                    "Cliente, mascota o doctor no existen."

            });

        }

        await cita.update({

            id_cliente,

            id_mascota,

            id_doctor,

            // Compatibilidad temporal
            propietario,
            mascota,
            doctor,

            fecha,

            hora,

            motivo,

            estado,

            costo

        });

        res.json(cita);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error actualizando la cita"

        });

    }

};
// ======================================================
// ELIMINAR CITA
// ======================================================

const eliminarCita = async (req, res) => {

    try {

        const cita = await Cita.findByPk(req.params.id);

        if (!cita) {

            return res.status(404).json({

                error: "Cita no encontrada"

            });

        }

        await cita.destroy();

        res.json({

            ok: true,

            mensaje: "Cita eliminada correctamente"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            ok: false,

            error: "Error eliminando la cita"

        });

    }

};


// ======================================================
// EXPORTACIONES
// ======================================================

module.exports = {

    obtenerCitas,

    obtenerCitaPorId,

    crearCita,

    actualizarCita,

    eliminarCita

};
