const { DataTypes } =
require("sequelize");

const sequelize =
require("../config/database");

const Mascota =
sequelize.define(

  "mascotas",

  {

    id: {

      type:
        DataTypes.INTEGER,

      primaryKey: true,

      autoIncrement: true

    },

    nombre: {

      type:
        DataTypes.STRING

    },

    especie: {

      type:
        DataTypes.STRING

    },

    raza: {

      type:
        DataTypes.STRING

    },

    edad: {

      type:
        DataTypes.STRING

    },

    sexo: {

      type:
        DataTypes.STRING

    },

    propietario: {

      type:
        DataTypes.STRING

    },

    foto: {

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
      "mascotas",

    timestamps: false

  }

);

module.exports =
Mascota;