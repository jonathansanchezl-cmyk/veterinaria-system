import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

const data = [
    { name: "Dr. Pérez", value: 40 },
    { name: "Dra. Ramos", value: 25 },
    { name: "Dr. Castillo", value: 20 },
    { name: "Dr. Soto", value: 15 }
];

const colors = [
    "#22C55E",
    "#3B82F6",
    "#7C3AED",
    "#F59E0B"
];

function VeterinarianChart() {

    return (

        <section className="chartCard veterinarianChart">

            <h3>🩺 Atención por Veterinario</h3>

            <ResponsiveContainer width="100%" height={260}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        innerRadius={60}
                        outerRadius={90}
                    >

                        {

                            data.map((entry,index)=>(

                                <Cell
                                    key={index}
                                    fill={colors[index]}
                                />

                            ))

                        }

                    </Pie>

                    <Tooltip/>

                </PieChart>

            </ResponsiveContainer>

        </section>

    );

}

export default VeterinarianChart;
