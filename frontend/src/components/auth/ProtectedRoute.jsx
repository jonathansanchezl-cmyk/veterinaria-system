import { Navigate } from "react-router-dom";

function ProtectedRoute({

    children,

    roles = []

}) {

    const usuario = JSON.parse(

        localStorage.getItem("usuario") || "null"

    );

    // No inició sesión

    if (!usuario) {

        return <Navigate to="/" replace />;

    }

    // Tiene sesión pero no tiene permisos

    if (

        roles.length > 0 &&

        !roles.includes(usuario.rol)

    ) {

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

export default ProtectedRoute;