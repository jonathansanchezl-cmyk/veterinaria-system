import api from "./api";

// ======================================
// OBTENER TODOS
// ======================================

export const getClientes = async () => {

    const { data } = await api.get("/clientes");

    return data;

};

// ======================================
// OBTENER UNO
// ======================================

export const getCliente = async (id) => {

    const { data } = await api.get(`/clientes/${id}`);

    return data;

};

// ======================================
// CREAR
// ======================================

export const crearCliente = async (cliente) => {

    const { data } = await api.post("/clientes", cliente);

    return data;

};

// ======================================
// ACTUALIZAR
// ======================================

export const actualizarCliente = async (id, cliente) => {

    const { data } = await api.put(`/clientes/${id}`, cliente);

    return data;

};

// ======================================
// ELIMINAR
// ======================================

export const eliminarCliente = async (id) => {

    const { data } = await api.delete(`/clientes/${id}`);

    return data;

};
