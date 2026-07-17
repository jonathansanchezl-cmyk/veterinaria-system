import { DollarSign } from "lucide-react";

function IncomeChart({ ingresos = 0 }) {

    const formatter = new Intl.NumberFormat("es-PE", {

        style: "currency",

        currency: "PEN",

        minimumFractionDigits: 2

    });

    return (

        <section className="chartCard incomeCard">

            <div className="incomeHeader">

                <div>

                    <h3>

                       

                        Ingresos

                    </h3>

                    <small>

                        Total de citas atendidas

                    </small>

                </div>

            </div>

            <div className="incomeBody">

                <h1>

                    {formatter.format(ingresos)}

                </h1>

            </div>

        </section>

    );

}

export default IncomeChart;
