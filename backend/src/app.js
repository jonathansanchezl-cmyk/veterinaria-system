const express =
require("express");

const cors =
require("cors");

require("dotenv").config();

const sequelize =
require("./config/database");

const app =
express();

// ======================================
// MIDDLEWARES
// ======================================

app.use(cors());

app.use(express.json());

// ======================================
// ROUTES
// ======================================

const authRoutes =
require("./routes/authRoutes");

const citasRoutes =
require("./routes/citasRoutes");

const doctoresRoutes =
require("./routes/doctoresRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const clientesRoutes =
require("./routes/clientesRoutes");

const mascotasRoutes =
require("./routes/mascotasRoutes");

const operadoresRoutes =
require("./routes/operadoresRoutes");

const historialRoutes =
require("./routes/historialRoutes");

// ======================================
// API ROUTES
// ======================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/citas",
  citasRoutes
);

app.use(
  "/api/doctores",
  doctoresRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/clientes",
  clientesRoutes
);

app.use(
  "/api/mascotas",
  mascotasRoutes
);

app.use(
  "/api/operadores",
  operadoresRoutes
);

app.use(
  "/api/historial", historialRoutes
);


// ======================================
// MYSQL
// ======================================

sequelize.authenticate()

.then(() => {

  console.log(
    "MYSQL CONECTADO"
  );

})

.catch((error) => {

  console.log(error);

});

// ======================================
// SERVER
// ======================================

app.listen(4000, () => {

  console.log(
    "Servidor ejecutándose puerto 4000"
  );

});
