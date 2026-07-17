import { useMemo, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import VeterinarioToolbar from "../components/veterinarios/VeterinarioToolbar";
import VeterinarioTable from "../components/veterinarios/VeterinarioTable";
import VeterinarioModal from "../components/veterinarios/VeterinarioModal";
import Pagination from "../components/common/Pagination";

import useVeterinarios from "../hooks/useVeterinarios";

function Veterinarios() {

    const {

        doctores,

        loading,

        guardarDoctor,

        eliminarDoctor,

        cargarDoctores

    } = useVeterinarios();

    const [modalOpen, setModalOpen] = useState(false);

    const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    const abrirNuevo = () => {

        setDoctorSeleccionado(null);

        setModalOpen(true);

    };

    const editar = (doctor) => {

        setDoctorSeleccionado(doctor);

        setModalOpen(true);

    };

    const cerrar = () => {

        setModalOpen(false);

        setDoctorSeleccionado(null);

    };

    const doctoresFiltrados = useMemo(() => {

        const texto = search.trim().toLowerCase();

        if (!texto) return doctores;

        return doctores.filter((doctor) =>

            doctor.nombres?.toLowerCase().includes(texto) ||

            doctor.especialidad?.toLowerCase().includes(texto) ||

            doctor.correo?.toLowerCase().includes(texto) ||

            doctor.telefono?.includes(texto)

        );

    }, [doctores, search]);

    const ultimo = currentPage * itemsPerPage;

    const primero = ultimo - itemsPerPage;

    const doctoresPagina = doctoresFiltrados.slice(

        primero,

        ultimo

    );

    return (

        <MainLayout>

            <div className="pageHeader">

                <div>

                    <h1>Gestión de Veterinarios</h1>

                    <p>

                        Administre el personal veterinario.

                    </p>

                    <small className="pageCounter">

                        Mostrando

                        <strong>

                            {" "}

                            {doctoresPagina.length}

                            {" "}

                        </strong>

                        de

                        <strong>

                            {" "}

                            {doctoresFiltrados.length}

                            {" "}

                        </strong>

                        veterinarios

                    </small>

                </div>

            </div>

            <VeterinarioToolbar

                onNuevo={abrirNuevo}

                onBuscar={(texto)=>{

                    setSearch(texto);

                    setCurrentPage(1);

                }}

            />

            <VeterinarioTable

                doctores={doctoresPagina}

                loading={loading}

                onEditar={editar}

                onEliminar={eliminarDoctor}

            />

            <Pagination

                totalItems={doctoresFiltrados.length}

                currentPage={currentPage}

                itemsPerPage={itemsPerPage}

                onPageChange={setCurrentPage}

                onItemsPerPageChange={(cantidad)=>{

                    setItemsPerPage(cantidad);

                    setCurrentPage(1);

                }}

            />

            <VeterinarioModal

                open={modalOpen}

                onClose={cerrar}

                doctor={doctorSeleccionado}

                onGuardar={guardarDoctor}

                onSuccess={cargarDoctores}

            />

        </MainLayout>

    );

}

export default Veterinarios;