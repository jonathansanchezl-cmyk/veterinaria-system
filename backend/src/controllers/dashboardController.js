const { fn, col, Op } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = require("../models/Cliente");
const Mascota = require("../models/Mascota");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Cita = require("../models/Cita");

const obtenerDashboard = async (req, res) => {

    try {

        // =====================================================
        // FECHA Y HORA DEL SERVIDOR MYSQL
        // =====================================================

        const [resultadoFecha] = await sequelize.query(`
            SELECT
                CURDATE() AS fecha,
                CURTIME() AS hora
        `);

        const fechaHoy = resultadoFecha[0].fecha;
        const horaActual = resultadoFecha[0].hora;

        console.log("======================================");
        console.log("Fecha MySQL :", fechaHoy);
        console.log("Hora  MySQL :", horaActual);
        console.log("======================================");

        const [

            clientes,
            mascotas,
            veterinarios,
            usuarios,
            citas,
            agendaHoy,
            ultimasMascotas,
            especies,
            citasPorVeterinario,
            ingresos

        ] = await Promise.all([

            Cliente.count(),

            Mascota.count(),

            Doctor.count(),

            User.count(),

            Cita.count(),

            // ==========================================
            // PRÓXIMA CITA
            // ==========================================

            Cita.findAll({

                where: {

                    estado: "CONFIRMADA",

                    [Op.or]: [

                        // Fechas posteriores a hoy

                        {
                            fecha: {
                                [Op.gt]: fechaHoy
                            }
                        },

                        // Hoy pero aún no inicia

                        {
                            fecha: fechaHoy,

                            hora: {
                                [Op.gte]: horaActual
                            }
                        }

                    ]

                },

                order: [

                    ["fecha", "ASC"],
                    ["hora", "ASC"]

                ],

                limit: 1

            }),

            // ==========================================

            Mascota.findAll({

                order: [

                    ["id", "DESC"]

                ],

                limit: 5

            }),

            Mascota.findAll({

                attributes: [

                    "especie",

                    [

                        fn("COUNT", col("especie")),

                        "total"

                    ]

                ],

                group: [

                    "especie"

                ],

                raw: true

            }),

            Cita.findAll({

                attributes: [

                    "doctor",

                    [

                        fn("COUNT", col("doctor")),

                        "total"

                    ]

                ],

                group: [

                    "doctor"

                ],

                raw: true

            }),

            Cita.sum("costo", {

                where: {

                    estado: "ATENDIDA"

                }

            })

        ]);

        res.json({

            clientes,
            mascotas,
            veterinarios,
            usuarios,
            citas,

            agendaHoy,

            ultimasMascotas,

            especies,

            citasPorVeterinario,

            ingresos: Number(ingresos ?? 0)

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            mensaje: "Error obteniendo dashboard",
            error: error.message

        });

    }

};

module.exports = {

    obtenerDashboard

};
