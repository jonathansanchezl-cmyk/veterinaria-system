function ReportCard({

    title,
    value,
    icon,
    color

}) {

    return (

        <div
            className="reportCard"
            style={{

                borderLeft: `6px solid ${color}`

            }}
        >

            <div
                className="reportIcon"
                style={{

                    backgroundColor: `${color}20`,
                    color

                }}
            >

                {icon}

            </div>

            <div className="reportContent">

                <span>

                    {title}

                </span>

                <h2>

                    {value}

                </h2>

            </div>

        </div>

    );

}

export default ReportCard;
