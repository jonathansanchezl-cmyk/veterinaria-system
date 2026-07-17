import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
    getMascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota as eliminarMascotaService
} from "../services/mascotasService";

function useMascotas() {

    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarMascotas = async () => {

        try {

            setLoading(true);

            const data = await getMascotas();

            setMascotas(data);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No fue posible cargar las mascotas.",
                "error"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        cargarMascotas();

    }, []);

    const guardarMascota = async (mascota) => {

        try {

            if (mascota.id) {

                await actualizarMascota(
                    mascota.id,
                    mascota
                );

            } else {

                await crearMascota(
                    mascota
                );

            }

            await cargarMascotas();

            Swal.fire(
                "Correcto",
                "Mascota guardada correctamente.",
                "success"
            );

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No fue posible guardar la mascota.",
                "error"
            );

        }

    };

    const eliminarMascota = async (mascota) => {

        const respuesta = await Swal.fire({

            title: "¿Eliminar mascota?",

            text: mascota.nombre,

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Eliminar",

            cancelButtonText: "Cancelar"

        });

        if (!respuesta.isConfirmed) {

            return;

        }

        try {

            await eliminarMascotaService(
                mascota.id
            );

            await cargarMascotas();

            Swal.fire(
                "Eliminada",
                "La mascota fue eliminada.",
                "success"
            );

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No fue posible eliminar la mascota.",
                "error"
            );

        }

    };

    return {

        mascotas,
        loading,
        cargarMascotas,
        guardarMascota,
        eliminarMascota

    };

}

export default useMascotas;
