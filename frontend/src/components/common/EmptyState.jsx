function EmptyState({

    title,

    message

}){

    return(

        <div className="emptyState">

            <h3>{title}</h3>

            <p>{message}</p>

        </div>

    );

}

export default EmptyState;
