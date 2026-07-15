import api from "./api";

export const getCitas = async () => {

    const response = await api.get("/citas");

    return response.data;

};

export const getCita = async (id) => {

    const response = await api.get(`/citas/${id}`);

    return response.data;

};

export const crearCita = async (cita) => {

    const response = await api.post("/citas", cita);

    return response.data;

};

export const actualizarCita = async (id, cita) => {

    const response = await api.put(`/citas/${id}`, cita);

    return response.data;

};

export const eliminarCita = async (id) => {

    const response = await api.delete(`/citas/${id}`);

    return response.data;

};

