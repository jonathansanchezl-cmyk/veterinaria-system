const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HistoriaClinica = sequelize.define(
    "HistoriaClinica",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_cita: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        id_mascota: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        id_doctor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        fecha: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        motivo_consulta: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        peso: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: true,
        },

        temperatura: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: true,
        },

        frecuencia_cardiaca: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        frecuencia_respiratoria: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        diagnostico: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        tratamiento: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        observaciones: {
            type: DataTypes.TEXT,
            allowNull: true,
        }

    },
    {
        tableName: "historia_clinica",
        timestamps: true,
    }
);

module.exports = HistoriaClinica;
