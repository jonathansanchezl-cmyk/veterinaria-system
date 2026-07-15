import {

    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip

} from "recharts";

const data = [

    { especie:"Perros", total:90 },
    { especie:"Gatos", total:55 },
    { especie:"Aves", total:22 },
    { especie:"Conejos", total:15 },
    { especie:"Otros", total:8 }

];

function SpeciesChart(){

    return(

        <section className="chartCard speciesChart">

            <h3>

                🐾 Mascotas Registradas

            </h3>

            <ResponsiveContainer
                width="100%"
                height={260}
            >

                <BarChart data={data}>

                    <XAxis dataKey="especie"/>

                    <Tooltip/>

                    <Bar

                        dataKey="total"

                        fill="#22C55E"

                        radius={[8,8,0,0]}

                    />

                </BarChart>

            </ResponsiveContainer>

        </section>

    );

}

export default SpeciesChart;
