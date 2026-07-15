function DashboardCard({

    icon,
    title,
    value,
    trend,
    color

}) {

    return (

        <div className="dashboardCard">

            <div
                className="dashboardCardIcon"
                style={{ background: color }}
            >
                {icon}
            </div>

            <div className="dashboardCardContent">

                <h2>{value}</h2>

                <h4>{title}</h4>

                <div className="cardTrend">

                    <span className="trendArrow">

                        ▲

                    </span>

                    <span>

                        {trend}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;