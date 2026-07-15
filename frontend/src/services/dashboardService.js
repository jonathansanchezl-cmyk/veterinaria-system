import api from "../api/api";

export const obtenerDashboard=()=>{

    return api.get("/dashboard");

};
