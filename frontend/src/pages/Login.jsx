import "../styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  // ======================================
  // LOGIN
  // ======================================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setError("");

      try {

        const response =
          await axios.post(

            "http://localhost:4000/api/auth/login",

            {

              email: email,

              password: password

            }

          );

        console.log(
          response.data
        );

        // LOGIN CORRECTO

        if (
          response.data.success === true
        ) {

          localStorage.setItem(

            "usuario",

            JSON.stringify(
              response.data.usuario
            )

          );

          navigate(
            "/dashboard"
          );

        } else {

          setError(
            response.data.message
          );

        }

      } catch (err) {

        console.log(err);

        setError(
          "Error de conexión con el servidor"
        );

      }

    };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>
          Bienvenido
        </h1>

        <p>
          Sistema Inteligente Veterinario
        </p>

        {
          error && (

            <div className="error-message">
              {error}
            </div>

          )
        }

        <form
          onSubmit={
            handleLogin
          }
        >

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button type="submit">
            Ingresar
          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;