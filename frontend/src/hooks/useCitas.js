import { useEffect, useState } from "react";

import {

    getCitas,

    eliminarCita

} from "../services/citasService";

export function useCitas() {

    const [citas, setCitas] = useState([]);

    const [loading, setLoading] = useState(true);

    const cargarCitas = async () => {

        setLoading(true);

        try {

            const data = await getCitas();

            setCitas(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const borrarCita = async (id) => {

        await eliminarCita(id);

        await cargarCitas();

    };

    useEffect(() => {

        cargarCitas();

    }, []);

    return {

        citas,

        loading,

        cargarCitas,

        borrarCita

    };

}