const { DataTypes } =
require("sequelize");

const sequelize =
require("../config/database");

const Doctor =
sequelize.define(

  "doctores",

  {

    id: {

      type:
        DataTypes.INTEGER,

      primaryKey: true,

      autoIncrement: true

    },

    nombres: {

      type:
        DataTypes.STRING

    },

    especialidad: {

      type:
        DataTypes.STRING

    },

    telefono: {

      type:
        DataTypes.STRING

    },

    correo: {

      type:
        DataTypes.STRING

    },

    horario: {

      type:
        DataTypes.STRING

    },

    estado: {

      type:
        DataTypes.STRING

    }

  },

  {

    tableName:
      "doctores",

    timestamps: false

  }

);

module.exports =
Doctor;