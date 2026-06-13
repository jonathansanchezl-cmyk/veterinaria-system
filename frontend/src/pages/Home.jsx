import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [data, setData] = useState({
    citasHoy: 0,
    noAtendidas: 0,
    ingresos: 0,
    proxima: null,
  });

  useEffect(() => {

    cargarDashboard();

  }, []);

  const cargarDashboard = async () => {

    try {

      const res = await axios.get(
        "http://localhost:4000/dashboard/resumen"
      );

      setData(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>
        Dashboard Veterinaria
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div className="card-dashboard">

          <h3>CITAS HOY</h3>

          <h1>{data.citasHoy}</h1>

        </div>

        <div className="card-dashboard">

          <h3>PRÓXIMA CITA</h3>

          <h1>
            {
              data.proxima
                ? data.proxima.hora
                : "--:--"
            }
          </h1>

        </div>

        <div className="card-dashboard">

          <h3>
            NO ATENDIDAS HOY
          </h3>

          <h1>
            {data.noAtendidas}
          </h1>

        </div>

        <div className="card-dashboard">

          <h3>INGRESOS HOY</h3>

          <h1>
            S/. {data.ingresos}
          </h1>

        </div>

      </div>

    </div>

  );

}

export default Home;
