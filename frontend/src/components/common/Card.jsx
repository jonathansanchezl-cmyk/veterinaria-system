function Card({

    title,

    subtitle,

    action,

    children,

    className = ""

}){

    return(

        <section className={`card ${className}`}>

            {(title || action) && (

                <div className="cardHeader">

                    <div>

                        {title && <h3>{title}</h3>}

                        {subtitle && (

                            <p>{subtitle}</p>

                        )}

                    </div>

                    {action}

                </div>

            )}

            <div className="cardBody">

                {children}

            </div>

        </section>

    );

}

export default Card;

