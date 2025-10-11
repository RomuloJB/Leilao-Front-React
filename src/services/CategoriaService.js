import api from "./api";

const CategoriaService = {
  listar: async ({ page = 0, size = 10, search }) => {
    const params = { page, size };
    if (search) params.search = search;
    const { data } = await api.get("/categorias", { params });
    return data;
  },
  buscarPorId: async (id) => {
    const { data } = await api.get(`/categorias/${id}`);
    return data;
  },
  criar: async (payload) => {
    const { data } = await api.post("/categorias", payload);
    return data;
  },
  atualizar: async (id, payload) => {
    const { data } = await api.put(`/categorias/${id}`, payload);
    return data;
  },
  remover: async (id) => {
    await api.delete(`/categorias/${id}`);
  }
};

export default CategoriaService;