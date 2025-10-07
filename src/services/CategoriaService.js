import BaseService from "./BaseService";

class CategoriaService extends BaseService{
    constructor () {
        super("/categorias");
    }

    async buscarPorId(id) {
        const resposta = await this.api.get(`${this.endPoint}/${id}`);
        return resposta;
    }

    async buscarPorNome(nome) {
        const resposta = await this.api.get(`${this.endPoint}/${nome}`);
        return resposta;
    }

    async alterarPorId(id) {
        const resposta = await this.api.put(`${this.endPoint}/${id}`, dados);
        return resposta;
    }
}

export default CategoriaService;