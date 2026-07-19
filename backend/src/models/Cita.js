const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cita = sequelize.define(
    "citas",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // ==========================================
        // NUEVAS LLAVES FORÁNEAS
        // ==========================================

        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        id_mascota: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        id_doctor: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        // ==========================================
        // CAMPOS ANTIGUOS
        // Se mantienen temporalmente para no romper
        // el frontend ni los controladores actuales
        // ==========================================

        mascota: {
            type: DataTypes.STRING,
            allowNull: true
        },

        propietario: {
            type: DataTypes.STRING,
            allowNull: true
        },

        doctor: {
            type: DataTypes.STRING,
            allowNull: true
        },

        // ==========================================
        // DATOS DE LA CITA
        // ==========================================

        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },

        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        estado: {
            type: DataTypes.STRING,
            allowNull: false
        },

        costo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        }

    },
    {
        tableName: "citas",
        timestamps: false,
        freezeTableName: true
    }
);

const HistoriaClinica = require("./HistoriaClinica");

Cita.hasOne(HistoriaClinica, {
    foreignKey: "id_cita",
    as: "historia"
});

HistoriaClinica.belongsTo(Cita, {
    foreignKey: "id_cita",
    as: "cita"
});


module.exports = Cita;
