import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {

    getDoctores,

    crearDoctor,

    actualizarDoctor,

    eliminarDoctor as eliminarDoctorService

} from "../services/doctoresService";

function useVeterinarios() {

    const [doctores, setDoctores] = useState([]);

    const [loading, setLoading] = useState(true);

    // ======================================
    // CARGAR DOCTORES
    // ======================================

    const cargarDoctores = async () => {

        try {

            setLoading(true);

            const data = await getDoctores();

            setDoctores(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No fue posible cargar los veterinarios."

            });

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        cargarDoctores();

    }, []);

    // ======================================
    // GUARDAR
    // ======================================

    const guardarDoctor = async (doctor) => {

        try {

            if (doctor.id) {

                await actualizarDoctor(

                    doctor.id,

                    doctor

                );

            }

            else {

                await crearDoctor(

                    doctor

                );

            }

            await cargarDoctores();

            Swal.fire({

                icon: "success",

                title: "Correcto",

                text: "Veterinario guardado correctamente.",

                timer: 1500,

                showConfirmButton: false

            });

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No fue posible guardar el veterinario."

            });

        }

    };

    // ======================================
    // ELIMINAR
    // ======================================

    const eliminarDoctor = async (doctor) => {

        const respuesta = await Swal.fire({

            title: "¿Eliminar veterinario?",

            text: doctor.nombres,

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Eliminar",

            cancelButtonText: "Cancelar"

        });

        if (!respuesta.isConfirmed) {

            return;

        }

        try {

            await eliminarDoctorService(

                doctor.id

            );

            await cargarDoctores();

            Swal.fire({

                icon: "success",

                title: "Veterinario eliminado",

                timer: 1200,

                showConfirmButton: false

            });

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No fue posible eliminar el veterinario."

            });

        }

    };

    return {

        doctores,

        loading,

        cargarDoctores,

        guardarDoctor,

        eliminarDoctor

    };

}

export default useVeterinarios;
