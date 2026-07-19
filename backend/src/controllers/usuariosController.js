const User = require("../models/User");

// ======================================
// OBTENER TODOS
// ======================================

const obtenerUsuarios = async (req, res) => {

    try {

        const usuarios = await User.findAll({

            order: [

                ["nombre", "ASC"]

            ]

        });

        res.json(usuarios);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo usuarios"

        });

    }

};

// ======================================
// OBTENER UNO
// ======================================

const obtenerUsuario = async (req, res) => {

    try {

        const usuario = await User.findByPk(

            req.params.id

        );

        if (!usuario) {

            return res.status(404).json({

                error: "Usuario no encontrado"

            });

        }

        res.json(usuario);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo usuario"

        });

    }

};

// ======================================
// CREAR
// ======================================

const crearUsuario = async (req, res) => {

    try {

        const usuario = await User.create(req.body);

        res.status(201).json(usuario);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error creando usuario"

        });

    }

};

// ======================================
// ACTUALIZAR
// ======================================

const actualizarUsuario = async (req, res) => {

    try {

        const usuario = await User.findByPk(

            req.params.id

        );

        if (!usuario) {

            return res.status(404).json({

                error: "Usuario no encontrado"

            });

        }

        await usuario.update(req.body);

        res.json(usuario);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error actualizando usuario"

        });

    }

};

// ======================================
// ELIMINAR
// ======================================

const eliminarUsuario = async (req, res) => {

    try {

        const usuario = await User.findByPk(

            req.params.id

        );

        if (!usuario) {

            return res.status(404).json({

                error: "Usuario no encontrado"

            });

        }

        await usuario.destroy();

        res.json({

            mensaje: "Usuario eliminado correctamente"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error eliminando usuario"

        });

    }

};

module.exports = {

    obtenerUsuarios,

    obtenerUsuario,

    crearUsuario,

    actualizarUsuario,

    eliminarUsuario

};
