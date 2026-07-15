import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const data = [

    { dia:"Lun", total:320 },
    { dia:"Mar", total:420 },
    { dia:"Mié", total:510 },
    { dia:"Jue", total:480 },
    { dia:"Vie", total:720 },
    { dia:"Sáb", total:630 },
    { dia:"Dom", total:810 }

];

function IncomeChart(){

    return(

        <section className="chartCard incomeChart">

            <h3>📈 Ingresos últimos 7 días</h3>

            <ResponsiveContainer
                width="100%"
                height={280}
            >

                <AreaChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="dia"/>

                    <Tooltip/>

                    <Area

                        type="monotone"

                        dataKey="total"

                        stroke="#22C55E"

                        fill="#DCFCE7"

                    />

                </AreaChart>

            </ResponsiveContainer>

        </section>

    );

}

export default IncomeChart;
