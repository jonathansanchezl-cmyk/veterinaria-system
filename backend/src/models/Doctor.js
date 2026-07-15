const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Doctor = sequelize.define(
    "doctores",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombres: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        especialidad: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        correo: {
            type: DataTypes.STRING(150),
            allowNull: true,
            validate: {
                isEmail: true
            }
        },

        horario: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        estado: {
            type: DataTypes.ENUM(
                "ACTIVO",
                "INACTIVO",
                "VACACIONES"
            ),
            allowNull: false,
            defaultValue: "ACTIVO"
        }

    },
    {
        tableName: "doctores",
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Doctor;

