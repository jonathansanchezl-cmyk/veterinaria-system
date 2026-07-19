const { Op } = require("sequelize");

const Cliente = require("../models/Cliente");
const Mascota = require("../models/Mascota");
const Cita = require("../models/Cita");
const Doctor = require("../models/Doctor");

// ======================================
// OBTENER REPORTE
// ======================================


const obtenerReporte = async (req, res) => {

console.log(req.query);
console.log("TIPO:", req.query.tipo);
console.log("DESDE:", req.query.desde);
console.log("HASTA:", req.query.hasta);

    try {

        const {

            tipo,
            desde,
            hasta

        } = req.query;

        let registros = [];

        switch ((tipo || "").toLowerCase()) {

            // ==================================
            // CLIENTES
            // ==================================

            case "clientes": {

                const where = {};

                if (desde && hasta && Cliente.rawAttributes.created_at) {

                    where.created_at = {

                        [Op.between]: [

                            desde,
                            hasta

                        ]

                    };

                }

                registros = await Cliente.findAll({

                    where,

                    order: [

                        ["nombre", "ASC"]

                    ]

                });

                break;

            }

            // ==================================
            // MASCOTAS
            // ==================================

            case "mascotas": {

                const where = {};

                if (desde && hasta && Mascota.rawAttributes.created_at) {

                    where.created_at = {

                        [Op.between]: [

                            desde,
                            hasta

                        ]

                    };

                }

                registros = await Mascota.findAll({

                    where,

                    order: [

                        ["nombre", "ASC"]

                    ]

                });

                break;

            }

            // ==================================
            // CITAS
            // ==================================

            case "citas": {

                const where = {};

                if (desde && hasta) {

                    where.fecha = {

                        [Op.between]: [

                            desde,
                            hasta

                        ]

                    };

                }

                registros = await Cita.findAll({

                    where,

                    order: [

                        ["fecha", "DESC"]

                    ]

                });

                break;

            }

            // ==================================
            // VETERINARIOS
            // ==================================

            case "veterinarios": {

                registros = await Doctor.findAll({

                    order: [

                        ["nombres", "ASC"]

                    ]

                });

                break;

            }

            default:

                return res.status(400).json({

                    ok: false,

                    mensaje: "Tipo de reporte inválido"

                });

        }

        return res.json({

            ok: true,

            total: registros.length,

            registros

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            ok: false,

            mensaje: "Error obteniendo reporte"

        });

    }

};

module.exports = {

    obtenerReporte

};
