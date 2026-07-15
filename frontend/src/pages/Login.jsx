import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaw, FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";




function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [usuario, setUsuario] = useState("");

    const [password, setPassword] = useState("");

    
    const iniciarSesion = async (e) => {

    e.preventDefault();

    const ok = await login(usuario, password);

    if (ok) {

        /*navigate("/dashboard");*/

        await Swal.fire({

    icon: "success",

    title: "¡Bienvenido!",

    text: `Hola ${usuario}, iniciando sesión...`,

    timer: 2500,

    showConfirmButton: false,

    background: "#ffffff",

    color: "#1E3A5F"

});

navigate("/dashboard");

    } else {

        Swal.fire({

    icon: "error",

    title: "Acceso denegado",

    text: "El correo electrónico o la contraseña son incorrectos. Verifique sus credenciales e inténtelo nuevamente.",

    confirmButtonText: "Entendido",

    confirmButtonColor: "#22C55E",

    background: "#ffffff",

    color: "#1E3A5F",

    allowOutsideClick: false

});

    }

};



    return (

        <div className="loginPage">

            {/* PANEL IZQUIERDO */}

            <div className="loginLeft">

                <div className="loginOverlay">

                    <div className="brand">

                        <div className="brandIcon">

                            <FaPaw />

                        </div>

                        <h1>ANIMALIA</h1>

                        <p>

                            Sistema Integral de Gestión Veterinaria

                        </p>

                    </div>

                </div>

            </div>

            {/* PANEL DERECHO */}

            <div className="loginRight">

                <div className="loginCard">

                    <h2>

                        Bienvenido

                    </h2>

                    <p>

                        Inicie sesión para continuar

                    </p>

                    <form onSubmit={iniciarSesion}>

                        <div className="inputGroup">

                            <FaUser />

                            <input

                                type="text"

                                placeholder="Usuario"

                                value={usuario}

                                onChange={(e)=>setUsuario(e.target.value)}

                            />

                        </div>

                        <div className="inputGroup">

                            <FaLock />

                            <input

                                type="password"

                                placeholder="Contraseña"

                                value={password}

                                onChange={(e)=>setPassword(e.target.value)}

                            />

                        </div>

                        <button>

                            Iniciar Sesión

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;
