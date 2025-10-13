import api from "../configs/axiosConfig";

const LeilaoService = {
  listar: async ({ page = 0, size = 10, search, categoriaId }) => {
    const params = { page, size };
    if (search) params.search = search;
    if (categoriaId) params.categoriaId = categoriaId;
    const { data } = await api.get("/leiloes", { params });
    return data;
  },
  buscarPorId: async (id) => {
    const { data } = await api.get(`/leiloes/${id}`);
    return data;
  },
  criar: async (payload) => {
    const { data } = await api.post("/leiloes", payload);
    return data;
  },
  atualizar: async (id, payload) => {
    const { data } = await api.put(`/leiloes/${id}`, payload);
    return data;
  },
  remover: async (id) => {
    await api.delete(`/leiloes/${id}`);
  }
};

export default LeilaoService;