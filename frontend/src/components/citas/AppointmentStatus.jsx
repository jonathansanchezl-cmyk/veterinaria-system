function AppointmentStatus({ estado }) {

    const estadoNormalizado = (estado || "").toUpperCase();

    const clases = {

        CONFIRMADO: "status success",

        PENDIENTE: "status warning",

        ATENDIDO: "status info",

        CANCELADO: "status danger",

        PROGRAMADA: "status primary"

    };

    return (

        <span

            className={

                clases[estadoNormalizado] || "status"

            }

        >

            {estadoNormalizado}

        </span>

    );

}

export default AppointmentStatus;
