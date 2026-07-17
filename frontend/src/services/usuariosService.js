import api from "./api";

const URL = "/usuarios";

export const obtenerUsuarios = () =>
    api.get(URL);

export const obtenerUsuario = (id) =>
    api.get(`${URL}/${id}`);

export const crearUsuario = (data) =>
    api.post(URL, data);

export const actualizarUsuario = (id, data) =>
    api.put(`${URL}/${id}`, data);

export const eliminarUsuario = (id) =>
    api.delete(`${URL}/${id}`);
