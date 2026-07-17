import { useMemo, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import MascotaToolbar from "../components/mascotas/MascotaToolbar";
import MascotaTable from "../components/mascotas/MascotaTable";
import MascotaModal from "../components/mascotas/MascotaModal";
import Pagination from "../components/common/Pagination";

import useMascotas from "../hooks/useMascotas";

function Mascotas() {

    const {

        mascotas,

        loading,

        guardarMascota,

        eliminarMascota,

        cargarMascotas

    } = useMascotas();

    const [modalOpen, setModalOpen] = useState(false);

    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    const abrirNuevo = () => {

        setMascotaSeleccionada(null);

        setModalOpen(true);

    };

    const editar = (mascota) => {

        setMascotaSeleccionada(mascota);

        setModalOpen(true);

    };

    const cerrar = () => {

        setModalOpen(false);

        setMascotaSeleccionada(null);

    };

    const mascotasFiltradas = useMemo(() => {

        const texto = search.trim().toLowerCase();

        if (!texto) {

            return mascotas;

        }

        return mascotas.filter((m) =>

            m.nombre?.toLowerCase().includes(texto) ||

            m.especie?.toLowerCase().includes(texto) ||

            m.raza?.toLowerCase().includes(texto) ||

            m.propietario?.toLowerCase().includes(texto)

        );

    }, [mascotas, search]);

    const ultimo = currentPage * itemsPerPage;

    const primero = ultimo - itemsPerPage;

    const mascotasPagina = mascotasFiltradas.slice(

        primero,

        ultimo

    );

    return (

        <MainLayout>

            <div className="pageHeader">

                <div>

                    <h1>

                        Gestión de Mascotas

                    </h1>

                    <p>

                        Administre las mascotas registradas.

                    </p>

                    <small className="pageCounter">

                        Mostrando

                        <strong> {mascotasPagina.length} </strong>

                        de

                        <strong> {mascotasFiltradas.length} </strong>

                        mascotas

                    </small>

                </div>

            </div>

            <MascotaToolbar

                onNuevo={abrirNuevo}

                onBuscar={(texto) => {

                    setSearch(texto);

                    setCurrentPage(1);

                }}

            />

            <MascotaTable

                mascotas={mascotasPagina}

                loading={loading}

                onEditar={editar}

                onEliminar={eliminarMascota}

            />

            <Pagination

                totalItems={mascotasFiltradas.length}

                currentPage={currentPage}

                itemsPerPage={itemsPerPage}

                onPageChange={setCurrentPage}

                onItemsPerPageChange={(cantidad) => {

                    setItemsPerPage(cantidad);

                    setCurrentPage(1);

                }}

            />

            <MascotaModal

                open={modalOpen}

                onClose={cerrar}

                mascota={mascotaSeleccionada}

                onGuardar={guardarMascota}

                onSuccess={cargarMascotas}

            />

        </MainLayout>

    );

}

export default Mascotas;
