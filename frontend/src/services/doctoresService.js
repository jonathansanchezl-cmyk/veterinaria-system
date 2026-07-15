import api from "./api";

// Obtener todos los doctores
export const getDoctores = async () => {
    const { data } = await api.get("/doctores");
    return data;
};

// Obtener un doctor
export const getDoctor = async (id) => {
    const { data } = await api.get(`/doctores/${id}`);
    return data;
};

// Crear doctor
export const crearDoctor = async (doctor) => {
    const { data } = await api.post("/doctores", doctor);
    return data;
};

// Actualizar doctor
export const actualizarDoctor = async (id, doctor) => {
    const { data } = await api.put(`/doctores/${id}`, doctor);
    return data;
};

// Eliminar doctor
export const eliminarDoctor = async (id) => {
    const { data } = await api.delete(`/doctores/${id}`);
    return data;
};
