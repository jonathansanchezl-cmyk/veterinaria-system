const sequelize =
require("../config/database");

// ======================================
// LOGIN
// ======================================

const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    // VALIDAR CAMPOS

    if (!email || !password) {

      return res.json({
        success: false,
        message:
          "Complete todos los campos"
      });

    }

    // CONSULTA MYSQL

    const [rows] =
      await sequelize.query(
        `
        SELECT *
        FROM usuarios
        WHERE email = ?
        AND password = ?
        `,
        {
          replacements: [
            email,
            password
          ]
        }
      );

    // LOGIN CORRECTO

    if (rows.length > 0) {

      return res.json({
        success: true,
        usuario: rows[0]
      });

    }

    // LOGIN INCORRECTO

    return res.json({
      success: false,
      message:
        "Usuario o contraseña incorrectos"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Error servidor"
    });

  }

};

module.exports = {
  login
};