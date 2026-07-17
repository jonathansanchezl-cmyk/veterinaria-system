import { useEffect, useState } from "react";

import {

    obtenerUsuarios,

    crearUsuario,

    actualizarUsuario,

    eliminarUsuario

} from "../services/usuariosService";

function useUsuarios() {

    const [

        usuarios,

        setUsuarios

    ] = useState([]);

    const [

        loading,

        setLoading

    ] = useState(true);

    const cargarUsuarios = async () => {

        try {

            const { data } =

                await obtenerUsuarios();

            setUsuarios(data);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        cargarUsuarios();

    }, []);

    const guardarUsuario = async (usuario) => {

        if (usuario.id) {

            await actualizarUsuario(

                usuario.id,

                usuario

            );

        }

        else {

            await crearUsuario(usuario);

        }

        cargarUsuarios();

    };

    const borrarUsuario = async (usuario) => {

        if (

            window.confirm(

                "¿Eliminar usuario?"

            )

        ) {

            await eliminarUsuario(

                usuario.id

            );

            cargarUsuarios();

        }

    };

    return {

        usuarios,

        loading,

        guardarUsuario,

        borrarUsuario,

        cargarUsuarios

    };

}

export default useUsuarios;
