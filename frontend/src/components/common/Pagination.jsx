function Pagination({

    totalItems,

    currentPage,

    itemsPerPage,

    onPageChange,

    onItemsPerPageChange

}) {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const inicio = totalItems === 0
        ? 0
        : (currentPage - 1) * itemsPerPage + 1;

    const fin = Math.min(

        currentPage * itemsPerPage,

        totalItems

    );

    return (

        <div className="pagination">

            <div className="paginationInfo">

                Mostrando

                <strong> {inicio} - {fin} </strong>

                de

                <strong> {totalItems} </strong>

                registros

            </div>

            <div className="paginationControls">

                <button

                    disabled={currentPage === 1}

                    onClick={() =>

                        onPageChange(currentPage - 1)

                    }

                >

                    ◀

                </button>

                {

                    Array.from(

                        { length: totalPages },

                        (_, i) => (

                            <button

                                key={i}

                                className={

                                    currentPage === i + 1

                                        ? "active"

                                        : ""

                                }

                                onClick={() =>

                                    onPageChange(i + 1)

                                }

                            >

                                {i + 1}

                            </button>

                        )

                    )

                }

                <button

                    disabled={

                        currentPage === totalPages

                    }

                    onClick={() =>

                        onPageChange(currentPage + 1)

                    }

                >

                    ▶

                </button>

                <select

                    value={itemsPerPage}

                    onChange={(e) =>

                        onItemsPerPageChange(

                            Number(e.target.value)

                        )

                    }

                >

                    <option value={10}>10</option>

                    <option value={20}>20</option>

                    <option value={50}>50</option>

                </select>

            </div>

        </div>

    );

}

export default Pagination;
