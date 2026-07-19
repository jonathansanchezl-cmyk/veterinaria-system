const express = require("express");
const cors = require("cors");

require("dotenv").config();

const sequelize = require("./config/database");
require("./models");

const app = express();

// ======================================
// MIDDLEWARES
// ======================================

app.use(cors());
app.use(express.json());

// ======================================
// ROUTES
// ======================================

const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const citasRoutes = require("./routes/citasRoutes");
const doctoresRoutes = require("./routes/doctoresRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const clientesRoutes = require("./routes/clientesRoutes");
const mascotasRoutes = require("./routes/mascotasRoutes");
const operadoresRoutes = require("./routes/operadoresRoutes");
const historialRoutes = require("./routes/historialRoutes");
const historiaClinicaRoutes = require("./routes/historiaClinicaRoutes");
const reportesRoutes = require("./routes/reportesRoutes");

// ======================================
// API ROUTES
// ======================================

app.use("/api/auth", authRoutes);

app.use("/api/usuarios", usuariosRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/citas", citasRoutes);

app.use("/api/doctores", doctoresRoutes);

app.use("/api/clientes", clientesRoutes);

app.use("/api/mascotas", mascotasRoutes);

app.use("/api/operadores", operadoresRoutes);

app.use("/api/historial", historialRoutes);

app.use("/api/historia", historiaClinicaRoutes);

app.use("/api/reportes", reportesRoutes);

// ======================================
// MYSQL
// ======================================

sequelize
    .authenticate()
    .then(() => {

        console.log("✅ MYSQL CONECTADO");

    })
    .catch((error) => {

        console.error("❌ Error de conexión MySQL");

        console.error(error);

    });

// ======================================
// SERVER
// ======================================

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {

    console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);

});