const { DataTypes } =
require("sequelize");

const sequelize =
require("../config/database");

const Operador =
sequelize.define(

  "operadores",

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

    email: {

      type:
        DataTypes.STRING

    },

    password: {

      type:
        DataTypes.STRING

    },

    rol: {

      type:
        DataTypes.STRING

    }

  },

  {

    tableName:
      "operadores",

    timestamps: false

  }

);

module.exports =
Operador;
