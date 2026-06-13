import {
  Routes,
  Route
}
from "react-router-dom";

// PAGINAS

import Login
from "./pages/Login";

import Dashboard
from "./pages/Dashboard";

import Citas
from "./pages/Citas";

import Clientes
from "./pages/Clientes";

import Doctores
from "./pages/Doctores";


import Operadores
from "./pages/Operadores";

import Mascotas
from "./pages/Mascotas";

import HistorialClinico
from "./pages/HistorialClinico";

// APP

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/citas"
        element={<Citas />}
      />

      <Route
        path="/clientes"
        element={<Clientes />}
      />

      <Route
        path="/doctores"
        element={<Doctores />}
      />


      <Route
        path="/operadores"
        element={<Operadores />}
      />

      <Route
        path="/mascotas"
        element={<Mascotas />}
      />

      <Route
        path="/historial"
        element={<HistorialClinico />}
      />

    </Routes>

  );

}

export default App;