import { createContext, useContext, useState } from "react";
import { login as loginService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    const login = async (email, password) => {

        try {

            const data = await loginService(email, password);

            if (data.success) {

                localStorage.setItem(
                    "usuario",
                    JSON.stringify(data.usuario)
                );

                setUsuario(data.usuario);

                return true;

            }

            return false;

        } catch (error) {

            console.error("Error de autenticación:", error);

            return false;

        }

    };

    const logout = () => {

        localStorage.removeItem("usuario");

        setUsuario(null);

    };

    return (

        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);