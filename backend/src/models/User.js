const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define(
  'usuarios',
  {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING
  },
  {
    timestamps: false
  }
)

module.exports = User