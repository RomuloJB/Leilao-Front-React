import api from "../configs/axiosConfig";

const PessoaService = {
  criar: async ({ nome, email, senha }) => {
    const payload = { nome, email, senha };
    const { data } = await api.post("/pessoa", payload);
    return data;
  },
};

export default PessoaService;