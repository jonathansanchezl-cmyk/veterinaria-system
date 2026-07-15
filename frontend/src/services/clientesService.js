import api from "./api";

// Obtener todos los clientes
export const getClientes = async () => {
    const { data } = await api.get("/clientes");
    return data;
};

// Obtener un cliente
export const getCliente = async (id) => {
    const { data } = await api.get(`/clientes/${id}`);
    return data;
};

// Crear cliente
export const crearCliente = async (cliente) => {
    const { data } = await api.post("/clientes", cliente);
    return data;
};

// Actualizar cliente
export const actualizarCliente = async (id, cliente) => {
    const { data } = await api.put(`/clientes/${id}`, cliente);
    return data;
};

// Eliminar cliente
export const eliminarCliente = async (id) => {
    const { data } = await api.delete(`/clientes/${id}`);
    return data;
};
