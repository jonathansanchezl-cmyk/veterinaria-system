function Modal({

    open,

    onClose,

    title,

    children

}) {

    if (!open) return null;

    return (

        <div className="modalOverlay">

            <div className="modalContainer">

                <div className="modalHeader">

                    <h2>

                        {title}

                    </h2>

                    <button

                        className="modalClose"

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="modalBody">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Modal;