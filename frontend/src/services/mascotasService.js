import api from "./api";

// Obtener todas las mascotas
export const getMascotas = async () => {
    const { data } = await api.get("/mascotas");
    return data;
};

// Obtener mascotas por cliente
export const getMascotasPorCliente = async (idCliente) => {
    const { data } = await api.get(`/mascotas?cliente=${idCliente}`);
    return data;
};

// Obtener una mascota
export const getMascota = async (id) => {
    const { data } = await api.get(`/mascotas/${id}`);
    return data;
};

// Crear mascota
export const crearMascota = async (mascota) => {
    const { data } = await api.post("/mascotas", mascota);
    return data;
};

// Actualizar mascota
export const actualizarMascota = async (id, mascota) => {
    const { data } = await api.put(`/mascotas/${id}`, mascota);
    return data;
};

// Eliminar mascota
export const eliminarMascota = async (id) => {
    const { data } = await api.delete(`/mascotas/${id}`);
    return data;
};
