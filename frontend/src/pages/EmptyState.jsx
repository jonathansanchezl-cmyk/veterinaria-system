import { FaInbox } from "react-icons/fa";

function EmptyState({

    title,

    message

}) {

    return (

        <div
            style={{

                padding:"60px",

                textAlign:"center"

            }}
        >

            <FaInbox

                size={60}

                color="#CBD5E1"

            />

            <h3>

                {title}

            </h3>

            <p>

                {message}

            </p>

        </div>

    );

}

export default EmptyState;