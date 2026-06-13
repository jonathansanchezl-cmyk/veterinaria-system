const { DataTypes }
= require("sequelize");

const sequelize =
  require("../config/database");

const Cliente =
  sequelize.define(

    "CLIENTES",

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

      dni: {

        type:
          DataTypes.STRING

      },

      telefono: {

        type:
          DataTypes.STRING

      },

      email: {

        type:
          DataTypes.STRING

      },

      direccion: {

        type:
          DataTypes.STRING

      },

      created_at: {

        type:
          DataTypes.DATE

      }

    },

    {

      tableName:
        "CLIENTES",

      timestamps: false

    }

  );

module.exports =
  Cliente;