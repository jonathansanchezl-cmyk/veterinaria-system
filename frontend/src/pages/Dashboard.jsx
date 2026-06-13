import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  // ======================================
  // STATES
  // ======================================

  const [data, setData] = useState({
    citasHoy: 0,
    ingresos: 0,
    noAtendidas: 0,
    proxima: null
  });

  const [horaActual, setHoraActual] =
    useState("");

  const [fechaActual, setFechaActual] =
    useState("");

  // ======================================
  // MENU
  // ======================================

  const menus = [

    {
      nombre: "Home",
      ruta: "/dashboard"
    },


    {
      nombre: "Operadores",
      ruta: "/operadores"
    },

    {
      nombre: "Citas",
      ruta: "/citas"
    },

    {
      nombre: "Doctores",
      ruta: "/doctores"
    },

    {
      nombre: "Clientes",
      ruta: "/clientes"
    },

    {
      nombre: "Mascotas",
      ruta: "/mascotas"
    },

    {
      nombre: "Historial Clínico",
      ruta: "/historial"
    }

  ];

  // ======================================
  // OBTENER DASHBOARD
  // ======================================

  const obtenerDashboard =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:4000/api/dashboard"
          );

        setData(
          response.data
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };

  // ======================================
  // RELOJ
  // ======================================

  useEffect(() => {

    obtenerDashboard();

    const intervalo =
      setInterval(() => {

        const ahora =
          new Date();

        setHoraActual(

          ahora.toLocaleTimeString(
            "es-PE"
          )

        );

        setFechaActual(

          ahora.toLocaleDateString(
            "es-PE",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            }
          )

        );

      }, 1000);

    return () =>
      clearInterval(
        intervalo
      );

  }, []);

  // ======================================
  // CERRAR SESION
  // ======================================

  const cerrarSesion =
    () => {

      localStorage.removeItem(
        "usuario"
      );

      navigate("/");

    };

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f6f9"
      }}
    >

      {/* ====================================== */}
      {/* SIDEBAR */}
      {/* ====================================== */}

      <div
        style={{
          width: "280px",
          background: "#ffffff",
          padding: "25px",
          boxShadow:
            "2px 0 10px rgba(0,0,0,0.05)",
          position: "relative",
          zIndex: 1
        }}
      >

        <h1
          style={{
            color: "#17a673",
            marginBottom: "40px",
            fontSize: "48px"
          }}
        >
          ANIMALIA
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >

          {
            menus.map((item) => (

              <button
                type="button"

                key={item.nombre}

                onClick={() => {

                  navigate(
                    item.ruta
                  );

                }}

                style={{
                  padding: "18px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#f1f3f5",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "17px",
                  color: "#183b6b",
                  transition: "0.3s"
                }}

                onMouseEnter={(e) => {

                  e.target.style.background =
                    "#183b6b";

                  e.target.style.color =
                    "#fff";

                }}

                onMouseLeave={(e) => {

                  e.target.style.background =
                    "#f1f3f5";

                  e.target.style.color =
                    "#183b6b";

                }}
              >
                {item.nombre}
              </button>

            ))
          }

        </div>

      </div>

      {/* ====================================== */}
      {/* CONTENIDO */}
      {/* ====================================== */}

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >

        {/* HEADER */}

        <div
          style={{
            background: "#fff",
            borderRadius: "25px",
            padding: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >

          <div>

            <h1
              style={{
                color: "#183b6b",
                marginBottom: "10px",
                fontSize: "55px"
              }}
            >
              Bienvenido
            </h1>

            <p
              style={{
                color: "#666",
                fontSize: "22px"
              }}
            >
              Panel de control del sistema veterinario
            </p>

          </div>

          <div
            style={{
              textAlign: "right"
            }}
          >

            <div
              style={{
                marginBottom: "10px",
                fontSize: "20px",
                color: "#000"
              }}
            >
              📅 {fechaActual}
            </div>

            <div
              style={{
                fontSize: "55px",
                fontWeight: "bold",
                color: "#000"
              }}
            >
              🕒 {horaActual}
            </div>

            <button
              type="button"

              onClick={cerrarSesion}

              style={{
                marginTop: "15px",
                background: "#dc3545",
                color: "#fff",
                border: "none",
                padding:
                  "14px 28px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              Salir del sistema
            </button>

          </div>

        </div>

        {/* ====================================== */}
        {/* TARJETAS */}
        {/* ====================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "25px"
          }}
        >

          {/* CITAS */}

          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "20px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#666"
              }}
            >
              CITAS ACTIVAS
            </h2>

            <h1
              style={{
                color: "#183b6b",
                fontSize: "55px"
              }}
            >
              {data.citasHoy}
            </h1>

          </div>

          {/* PROXIMA */}

          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "20px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#666"
              }}
            >
              PRÓXIMA CITA
            </h2>

            <h1
              style={{
                color: "#183b6b",
                fontSize: "55px"
              }}
            >
              {
                data.proxima
                  ? data.proxima.hora
                  : "--:--"
              }
            </h1>

            <p
              style={{
                color: "#666",
                fontSize: "18px"
              }}
            >
              {
                data.proxima
                  ? data.proxima.fecha
                  : "Sin citas"
              }
            </p>

          </div>

          {/* NO ATENDIDAS */}

          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "20px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#666"
              }}
            >
              NO ATENDIDAS
            </h2>

            <h1
              style={{
                color: "#183b6b",
                fontSize: "55px"
              }}
            >
              {data.noAtendidas}
            </h1>

          </div>

          {/* INGRESOS */}

          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "20px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#666"
              }}
            >
              INGRESOS
            </h2>

            <h1
              style={{
                color: "#183b6b",
                fontSize: "55px"
              }}
            >
              S/. {data.ingresos}
            </h1>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;