const { Sequelize } =
require("sequelize");

require("dotenv").config();

// ======================================
// SEQUELIZE
// ======================================

const sequelize =
new Sequelize(

  process.env.DB_NAME,

  process.env.DB_USER,

  process.env.DB_PASSWORD,

  {

    host:
      process.env.DB_HOST,

    port:
      process.env.DB_PORT,

    dialect: "mysql",

    logging: false,

  }

);

// ======================================
// TEST CONEXION
// ======================================

sequelize
  .authenticate()

  .then(() => {

    console.log(
      "MYSQL CONECTADO"
    );

  })

  .catch((error) => {

    console.log(
      "ERROR MYSQL"
    );

    console.log(error);

  });

// ======================================
// EXPORTAR
// ======================================

module.exports = sequelize;