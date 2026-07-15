const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Mascota = sequelize.define(
    "mascotas",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },

        especie: {
            type: DataTypes.STRING
        },

        raza: {
            type: DataTypes.STRING
        },

        edad: {
            type: DataTypes.INTEGER
        },

        sexo: {
            type: DataTypes.STRING
        },

        // ==================================================
        // NUEVO CAMPO (RELACIÓN CON CLIENTES)
        // ==================================================

        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        // ==================================================
        // CAMPO ANTIGUO
        // Se mantiene temporalmente para compatibilidad
        // ==================================================

        propietario: {
            type: DataTypes.STRING,
            allowNull: true
        },

        foto: {
            type: DataTypes.STRING
        },

        estado: {
            type: DataTypes.STRING
        }

    },
    {
        tableName: "mascotas",
        timestamps: false
    }
);

module.exports = Mascota;
