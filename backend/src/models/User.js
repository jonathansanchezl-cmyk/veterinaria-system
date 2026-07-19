const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "usuarios",
    {

        id: {

            type: DataTypes.INTEGER,

            primaryKey: true,

            autoIncrement: true

        },

        nombre: {

            type: DataTypes.STRING

        },

        usuario: {

            type: DataTypes.STRING

        },

        email: {

            type: DataTypes.STRING

        },

        password: {

            type: DataTypes.STRING

        },

        rol: {

            type: DataTypes.STRING

        },

        estado: {

            type: DataTypes.ENUM(

                "ACTIVO",

                "INACTIVO"

            )

        }

    },

    {

        timestamps: true,

        createdAt: "createdAt",

        updatedAt: "updatedAt"

    }

);

module.exports = User;
