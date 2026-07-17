function DashboardCard({

    titulo,

    valor,

    icono,

    color

}) {

    return (

        <div

            className="dashboardCard"

            style={{

                borderLeft:`6px solid ${color}`

            }}

        >

            <div className="dashboardCardIcon">

                {icono}

            </div>

            <div>

                <h5>

                    {titulo}

                </h5>

                <h2>

                    {valor}

                </h2>

            </div>

        </div>

    );

}

export default DashboardCard;
