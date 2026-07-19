const HistoriaClinica = require("../models/HistoriaClinica");
const Cita = require("../models/Cita");
const sequelize = require("../config/database");

class HistoriaClinicaController {

    // =====================================================
    // Registrar atención médica
    // =====================================================
    static async crear(req, res) {

        const transaction = await sequelize.transaction();

        try {

            const {

                id_cita,
                peso,
                temperatura,
                frecuencia_cardiaca,
                frecuencia_respiratoria,
                diagnostico,
                tratamiento,
                observaciones

            } = req.body;

            //--------------------------------------------------
            // Buscar la cita
            //--------------------------------------------------

            const cita = await Cita.findByPk(id_cita, { transaction });

            if (!cita) {

                await transaction.rollback();

                return res.status(404).json({

                    ok: false,
                    mensaje: "La cita no existe."

                });

            }

            //--------------------------------------------------
            // Validar estado
            //--------------------------------------------------

            if (cita.estado === "ATENDIDA") {

                await transaction.rollback();

                return res.status(400).json({

                    ok: false,
                    mensaje: "La cita ya fue atendida."

                });

            }

            //--------------------------------------------------
            // Crear Historia Clínica
            //--------------------------------------------------

            const historia = await HistoriaClinica.create({

                id_cita: cita.id,
                id_mascota: cita.id_mascota,
                id_doctor: cita.id_doctor,

                fecha: cita.fecha,

                motivo_consulta: cita.motivo,

                peso,
                temperatura,
                frecuencia_cardiaca,
                frecuencia_respiratoria,

                diagnostico,
                tratamiento,
                observaciones

            }, { transaction });

            //--------------------------------------------------
            // Actualizar estado de la cita
            //--------------------------------------------------

            cita.estado = "ATENDIDA";

            await cita.save({ transaction });

            //--------------------------------------------------

            await transaction.commit();

            return res.status(201).json({

                ok: true,

                mensaje: "Historia clínica registrada correctamente.",

                data: historia

            });

        }

        catch (error) {

            await transaction.rollback();

            console.error(error);

            return res.status(500).json({

                ok: false,

                mensaje: "Error registrando historia clínica.",

                error: error.message

            });

        }

    }

    // =====================================================
    // Obtener historial por mascota
    // =====================================================

    static async obtenerPorMascota(req, res) {

        try {

            const { idMascota } = req.params;

            const historias = await HistoriaClinica.findAll({

                where: {

                    id_mascota: idMascota

                },

                include: [

                    {

                        model: Cita,

                        as: "cita"

                    }

                ],

                order: [

                    ["fecha", "DESC"]

                ]

            });

            return res.json({

                ok: true,

                total: historias.length,

                data: historias

            });

        }

        catch (error) {

            console.error(error);

            return res.status(500).json({

                ok: false,

                mensaje: "Error obteniendo historial.",

                error: error.message

            });

        }

    }

    // =====================================================
    // Obtener una atención
    // =====================================================

    static async obtenerUno(req, res) {

        try {

            const historia = await HistoriaClinica.findByPk(

                req.params.id

            );

            if (!historia) {

                return res.status(404).json({

                    ok: false,

                    mensaje: "Historia clínica no encontrada."

                });

            }

            return res.json({

                ok: true,

                data: historia

            });

        }

        catch (error) {

            return res.status(500).json({

                ok: false,

                error: error.message

            });

        }

    }

    // =====================================================
    // Actualizar
    // =====================================================

    static async actualizar(req, res) {

        try {

            const historia = await HistoriaClinica.findByPk(

                req.params.id

            );

            if (!historia) {

                return res.status(404).json({

                    ok: false,

                    mensaje: "No encontrada."

                });

            }

            await historia.update(req.body);

            return res.json({

                ok: true,

                mensaje: "Historia clínica actualizada.",

                data: historia

            });

        }

        catch (error) {

            return res.status(500).json({

                ok: false,

                error: error.message

            });

        }

    }

    // =====================================================
    // Eliminar
    // =====================================================

    static async eliminar(req, res) {

        try {

            const historia = await HistoriaClinica.findByPk(

                req.params.id

            );

            if (!historia) {

                return res.status(404).json({

                    ok: false,

                    mensaje: "No encontrada."

                });

            }

            await historia.destroy();

            return res.json({

                ok: true,

                mensaje: "Historia clínica eliminada."

            });

        }

        catch (error) {

            return res.status(500).json({

                ok: false,

                error: error.message

            });

        }

    }

}

module.exports = HistoriaClinicaController;