import { useMemo, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import UsuarioToolbar from "../components/usuarios/UsuarioToolbar";
import UsuarioTable from "../components/usuarios/UsuarioTable";
import UsuarioModal from "../components/usuarios/UsuarioModal";
import Pagination from "../components/common/Pagination";

import useUsuarios from "../hooks/useUsuarios";

function Usuarios() {

    const {

        usuarios,

        loading,

        guardarUsuario,

        borrarUsuario,

        cargarUsuarios

    } = useUsuarios();

    const [modalOpen, setModalOpen] = useState(false);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    const abrirNuevo = () => {

        setUsuarioSeleccionado(null);

        setModalOpen(true);

    };

    const editar = (usuario) => {

        setUsuarioSeleccionado(usuario);

        setModalOpen(true);

    };

    const cerrar = () => {

        setModalOpen(false);

        setUsuarioSeleccionado(null);

    };

    const usuariosFiltrados = useMemo(() => {

        const texto = search.trim().toLowerCase();

        if (!texto) return usuarios;

        return usuarios.filter((usuario) =>

            usuario.nombre?.toLowerCase().includes(texto) ||

            usuario.usuario?.toLowerCase().includes(texto) ||

            usuario.email?.toLowerCase().includes(texto) ||

            usuario.rol?.toLowerCase().includes(texto)

        );

    }, [usuarios, search]);

    const ultimo = currentPage * itemsPerPage;

    const primero = ultimo - itemsPerPage;

    const usuariosPagina = usuariosFiltrados.slice(

        primero,

        ultimo

    );

    return (

        <MainLayout>

            <div className="pageHeader">

                <div>

                    <h1>

                        Gestión de Usuarios

                    </h1>

                    <p>

                        Administre los usuarios del sistema.

                    </p>

                    <small className="pageCounter">

                        Mostrando

                        <strong>

                            {" "}

                            {usuariosPagina.length}

                            {" "}

                        </strong>

                        de

                        <strong>

                            {" "}

                            {usuariosFiltrados.length}

                            {" "}

                        </strong>

                        usuarios

                    </small>

                </div>

            </div>

            <UsuarioToolbar

                onNuevo={abrirNuevo}

                onBuscar={(texto)=>{

                    setSearch(texto);

                    setCurrentPage(1);

                }}

            />

            <UsuarioTable

                usuarios={usuariosPagina}

                loading={loading}

                onEditar={editar}

                onEliminar={borrarUsuario}

            />

            <Pagination

                totalItems={usuariosFiltrados.length}

                currentPage={currentPage}

                itemsPerPage={itemsPerPage}

                onPageChange={setCurrentPage}

                onItemsPerPageChange={(cantidad)=>{

                    setItemsPerPage(cantidad);

                    setCurrentPage(1);

                }}

            />

            <UsuarioModal

                open={modalOpen}

                onClose={cerrar}

                usuario={usuarioSeleccionado}

                onGuardar={guardarUsuario}

                onSuccess={cargarUsuarios}

            />

        </MainLayout>

    );

}

export default Usuarios;
