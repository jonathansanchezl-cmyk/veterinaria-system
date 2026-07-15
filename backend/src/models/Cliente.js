const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = sequelize.define(
    "clientes",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        dni: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
            validate: {
                isEmail: true
            }
        },

        direccion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        }

    },
    {
        tableName: "clientes",
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Cliente;