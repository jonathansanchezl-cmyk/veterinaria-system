import {

    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip

} from "recharts";

function SpeciesChart({

    data = []

}) {

    const chartData = data.map((item) => ({

        especie:
            item.especie.charAt(0).toUpperCase() +
            item.especie.slice(1),

        total: Number(item.total)

    }));

    return (

        <section className="chartCard speciesChart">

            <h3>

                🐾 Mascotas por Especie

            </h3>

            {

                chartData.length === 0 ? (

                    <div className="emptyState">

                        No existen datos para mostrar.

                    </div>

                ) : (

                    <ResponsiveContainer

                        width="100%"

                        height={280}

                    >

                        <BarChart

                            data={chartData}

                            margin={{

                                top:20,

                                right:20,

                                left:0,

                                bottom:5

                            }}

                        >

                            <CartesianGrid

                                strokeDasharray="3 3"

                            />

                            <XAxis

                                dataKey="especie"

                            />

                            <YAxis />

                            <Tooltip />

                            <Bar

                                dataKey="total"

                                fill="#22C55E"

                                radius={[8,8,0,0]}

                            />

                        </BarChart>

                    </ResponsiveContainer>

                )

            }

        </section>

    );

}

export default SpeciesChart;