import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import './CadastrarProduto.css';

const CadastrarProduto = () => {

    const [produto, setProduto] = useState({ id: 0, descricao: '', data: '' });
    const [produtos, setProdutos] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
        setProdutos(produtosSalvos);
        setProduto({ ...produto, id: produtosSalvos.length });
    }, []);

    const cadastrar = () => {
        if (!produto.descricao.trim() || !produto.data.trim()) {
            setMensagem('Por favor, preencha todos os campos!');
            return;
        }

        const novosProdutos = [...produtos, produto];
        setProdutos(novosProdutos);
        localStorage.setItem("produtos", JSON.stringify(novosProdutos));
        
        // Reset do formulário
        setProduto({ 
            id: novosProdutos.length, 
            descricao: '', 
            data: '' 
        });
        setMensagem('Produto cadastrado com sucesso!');
        
        // Limpa a mensagem após 3 segundos
        setTimeout(() => setMensagem(''), 3000);
    }

    const atualizarValor = (event) => {
        setProduto({ ...produto, [event.target.id]: event.target.value });
        setMensagem(''); // Limpa mensagens quando o usuário digita
    }


    return (
        <div className="cadastrar-produto">
            <h1>Cadastrar Produto</h1>
            
            {mensagem && (
                <div className={`mensagem ${mensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
                    {mensagem}
                </div>
            )}
            
            <div className="form-group">
                <label htmlFor="descricao">Descrição:</label>
                <input 
                    type="text" 
                    value={produto.descricao} 
                    id="descricao" 
                    onChange={atualizarValor}
                    placeholder="Digite a descrição do produto"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="data">Data:</label>
                <input 
                    type="date" 
                    id="data" 
                    value={produto.data} 
                    onChange={atualizarValor}
                />
            </div>
            
            <div className="botoes">
                <button onClick={cadastrar} className="btn-cadastrar">
                    Cadastrar
                </button>
                <Button label="Enviar" onClick={cadastrar} />
            </div>
            
            {produtos.length > 0 && (
                <div className="produtos-cadastrados">
                    <h3>Produtos Cadastrados ({produtos.length}):</h3>
                    <ul>
                        {produtos.map((prod, index) => (
                            <li key={index}>
                                <strong>{prod.descricao}</strong> - {prod.data}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default CadastrarProduto;