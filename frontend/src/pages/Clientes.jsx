import { useMemo, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import ClienteToolbar from "../components/clientes/ClienteToolbar";
import ClienteTable from "../components/clientes/ClienteTable";
import ClienteModal from "../components/clientes/ClienteModal";
import Pagination from "../components/common/Pagination";

import useClientes from "../hooks/useClientes";

function Clientes() {

    

    const {

        clientes,

        loading,

        guardarCliente,

        eliminarCliente,

        cargarClientes

    } = useClientes();

    const [modalOpen, setModalOpen] = useState(false);

    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    const abrirNuevo = () => {

        setClienteSeleccionado(null);

        setModalOpen(true);

    };

    const editar = (cliente) => {

        setClienteSeleccionado(cliente);

        setModalOpen(true);

    };

    const cerrar = () => {

        setModalOpen(false);

        setClienteSeleccionado(null);

    };

const clientesFiltrados = useMemo(() => {

    const texto = search.trim().toLowerCase();

    if (!texto) {

        return clientes;

    }

    return clientes.filter((cliente) =>

        cliente.nombre?.toLowerCase().includes(texto) ||

        cliente.dni?.toString().includes(texto) ||

        cliente.telefono?.toString().includes(texto) ||

        cliente.email?.toLowerCase().includes(texto) ||

        cliente.direccion?.toLowerCase().includes(texto)

        
    );
    console.log("CLIENTES:", clientes);

}, [clientes, search]);






    const ultimo = currentPage * itemsPerPage;

    const primero = ultimo - itemsPerPage;

    const clientesPagina = clientesFiltrados.slice(

        primero,

        ultimo

    );

    return (

        <MainLayout>

            <div className="pageHeader">

                <div>

                    <h1>

                        Gestión de Clientes

                    </h1>

                    <p>

                        Administre los clientes registrados.

                    </p>

                    <small className="pageCounter">

                        Mostrando

                        <strong>

                            {" "}

                            {clientesPagina.length}

                            {" "}

                        </strong>

                        de

                        <strong>

                            {" "}

                            {clientesFiltrados.length}

                            {" "}

                        </strong>

                        clientes

                    </small>

                </div>

            </div>

            <ClienteToolbar

                onNuevo={abrirNuevo}

                onBuscar={(texto) => {

                    setSearch(texto);

                    setCurrentPage(1);

                }}

            />

            <ClienteTable

                clientes={clientesPagina}

                loading={loading}

                onEditar={editar}

                onEliminar={eliminarCliente}

            />

            <Pagination

                totalItems={clientesFiltrados.length}

                currentPage={currentPage}

                itemsPerPage={itemsPerPage}

                onPageChange={setCurrentPage}

                onItemsPerPageChange={(cantidad) => {

                    setItemsPerPage(cantidad);

                    setCurrentPage(1);

                }}

            />

            <ClienteModal

                open={modalOpen}

                onClose={cerrar}

                cliente={clienteSeleccionado}

                onGuardar={guardarCliente}

                onSuccess={cargarClientes}

            />

        </MainLayout>

    );

}

export default Clientes;
