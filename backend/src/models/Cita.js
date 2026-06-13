const { DataTypes } = require("sequelize");

const sequelize =
  require("../config/database");

const Cita = sequelize.define(
  "citas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    mascota: {
      type: DataTypes.STRING,
    },

    propietario: {
      type: DataTypes.STRING,
    },

    doctor: {
      type: DataTypes.STRING,
    },

    fecha: {
      type: DataTypes.STRING,
    },

    hora: {
      type: DataTypes.STRING,
    },

    motivo: {
      type: DataTypes.STRING,
    },

    estado: {
      type: DataTypes.STRING,
    },

    costo: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Cita;