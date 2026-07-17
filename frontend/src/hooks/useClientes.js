import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {

    getClientes,

    crearCliente,

    actualizarCliente,

    eliminarCliente as eliminarClienteService

} from "../services/clientesService";

function useClientes() {

    const [clientes, setClientes] = useState([]);

    const [loading, setLoading] = useState(true);

    // =====================================
    // CARGAR CLIENTES
    // =====================================

    const cargarClientes = async () => {

        try {

            setLoading(true);

            const data = await getClientes();

            setClientes(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No fue posible cargar los clientes."

            });

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        cargarClientes();

    }, []);

    // =====================================
    // GUARDAR
    // =====================================

    const guardarCliente = async (cliente) => {

        try {

            if (cliente.id) {

                await actualizarCliente(

                    cliente.id,

                    cliente

                );

            }

            else {

                await crearCliente(

                    cliente

                );

            }

            await cargarClientes();

            Swal.fire({

                icon: "success",

                title: "Éxito",

                text: "Cliente guardado correctamente.",

                timer: 1500,

                showConfirmButton: false

            });

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No fue posible guardar el cliente."

            });

        }

    };

    // =====================================
    // ELIMINAR
    // =====================================

    const eliminarCliente = async (cliente) => {

        const respuesta = await Swal.fire({

            title: "¿Eliminar cliente?",

            text: cliente.nombre,

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Eliminar",

            cancelButtonText: "Cancelar"

        });

        if (!respuesta.isConfirmed) {

            return;

        }

        try {

            await eliminarClienteService(

                cliente.id

            );

            await cargarClientes();

            Swal.fire({

                icon: "success",

                title: "Cliente eliminado",

                timer: 1200,

                showConfirmButton: false

            });

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No fue posible eliminar."

            });

        }

    };

    return {

        clientes,

        loading,

        cargarClientes,

        guardarCliente,

        eliminarCliente

    };

}

export default useClientes;
