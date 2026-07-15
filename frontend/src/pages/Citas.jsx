import { useMemo, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import AppointmentToolbar from "../components/citas/AppointmentToolbar";
import AppointmentTable from "../components/citas/AppointmentTable";
import AppointmentModal from "../components/citas/AppointmentModal";
import Pagination from "../components/common/Pagination";

import { useCitas } from "../hooks/useCitas";

function Citas() {

    const {

        citas,

        loading,

        cargarCitas,

        borrarCita

    } = useCitas();

    // ===============================
    // MODAL
    // ===============================

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedCita, setSelectedCita] = useState(null);

    // ===============================
    // FILTROS
    // ===============================

    const [search, setSearch] = useState("");

    const [estado, setEstado] = useState("");

    const [fecha, setFecha] = useState("");

    // ===============================
    // ORDENAMIENTO
    // ===============================

    const [sortField, setSortField] = useState("fecha");

    const [sortDirection, setSortDirection] = useState("asc");

    // ===============================
    // PAGINACION
    // ===============================

    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    // ===============================
    // MODAL
    // ===============================

    const abrirNueva = () => {

        setSelectedCita(null);

        setModalOpen(true);

    };

    const editar = (cita) => {

        setSelectedCita(cita);

        setModalOpen(true);

    };

    const cerrar = () => {

        setModalOpen(false);

        setSelectedCita(null);

    };

    // ===============================
    // FILTRAR
    // ===============================

    const citasFiltradas = useMemo(() => {

        return citas.filter((cita) => {

            const texto = search.trim().toLowerCase();

            const coincideTexto =

                !texto ||

                cita.mascota?.toLowerCase().includes(texto) ||

                cita.propietario?.toLowerCase().includes(texto) ||

                cita.doctor?.toLowerCase().includes(texto) ||

                cita.motivo?.toLowerCase().includes(texto);

            const coincideEstado =

                !estado ||

                cita.estado === estado;

            const coincideFecha =

                !fecha ||

                cita.fecha === fecha;

            return (

                coincideTexto &&

                coincideEstado &&

                coincideFecha

            );

        });

    }, [

        citas,

        search,

        estado,

        fecha

    ]);

    // ===============================
    // ORDENAR
    // ===============================

    const citasOrdenadas = useMemo(() => {

        const lista = [...citasFiltradas];

        lista.sort((a, b) => {

            let valorA = a[sortField];

            let valorB = b[sortField];

            if (sortField === "fecha") {

                valorA = new Date(valorA);

                valorB = new Date(valorB);

            }

            if (sortField === "costo") {

                valorA = Number(valorA);

                valorB = Number(valorB);

            }

            if (

                typeof valorA === "string" &&

                typeof valorB === "string"

            ) {

                valorA = valorA.toUpperCase();

                valorB = valorB.toUpperCase();

            }

            if (valorA < valorB) {

                return sortDirection === "asc"

                    ? -1

                    : 1;

            }

            if (valorA > valorB) {

                return sortDirection === "asc"

                    ? 1

                    : -1;

            }

            return 0;

        });

        return lista;

    }, [

        citasFiltradas,

        sortField,

        sortDirection

    ]);

    // ===============================
    // PAGINACION
    // ===============================

    const indexUltimo = currentPage * itemsPerPage;

    const indexPrimero = indexUltimo - itemsPerPage;

    const citasPagina = citasOrdenadas.slice(

        indexPrimero,

        indexUltimo

    );
        // ===============================
    // RENDER
    // ===============================

    return (

        <MainLayout>

            <div className="pageHeader">

                <div>

                    <h1>

                        Gestión de Citas

                    </h1>

                    <p>

                        Administre todas las citas de la clínica veterinaria.

                    </p>

                    <small className="pageCounter">

                        Mostrando

                        <strong>

                            {" "}

                            {citasPagina.length}

                            {" "}

                        </strong>

                        de

                        <strong>

                            {" "}

                            {citasOrdenadas.length}

                            {" "}

                        </strong>

                        citas filtradas

                    </small>

                </div>

            </div>

            <AppointmentToolbar

                onNew={abrirNueva}

                onSearch={(valor) => {

                    setSearch(valor);

                    setCurrentPage(1);

                }}

                onEstadoChange={(valor) => {

                    setEstado(valor);

                    setCurrentPage(1);

                }}

                onFechaChange={(valor) => {

                    setFecha(valor);

                    setCurrentPage(1);

                }}

            />

            <AppointmentTable

                citas={citasPagina}

                loading={loading}

                onEdit={editar}

                onDelete={borrarCita}

                sortField={sortField}

                sortDirection={sortDirection}

                onSort={(campo) => {

                    if (campo === sortField) {

                        setSortDirection((direccion) =>

                            direccion === "asc"

                                ? "desc"

                                : "asc"

                        );

                    } else {

                        setSortField(campo);

                        setSortDirection("asc");

                    }

                }}

            />

            <Pagination

                totalItems={citasOrdenadas.length}

                currentPage={currentPage}

                itemsPerPage={itemsPerPage}

                onPageChange={setCurrentPage}

                onItemsPerPageChange={(cantidad) => {

                    setItemsPerPage(cantidad);

                    setCurrentPage(1);

                }}

            />

            <AppointmentModal

                    isOpen={modalOpen}

                    cita={selectedCita}

                    onClose={cerrar}

                    onSuccess={cargarCitas}


            />

        </MainLayout>

    );
    }

export default Citas;
