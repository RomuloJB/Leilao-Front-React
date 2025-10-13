import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import './Cadastro.css';

const Cadastro = () => {

    const [produto, setProduto] = useState({ id: 0, descricao: '', data: '' });
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        setProduto({ ...produto, id: produtos.length });
    }, []);

    const cadastrar = () => {
        produtos.push(produto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    const atualizarValor = (event) => {
        setProduto({ ...produto, [event.target.id]: event.target.value });
        console.log(produto);
    }


    return (
        <>
            <h1>Cadastro de </h1>
            {produto.descricao}
            <input type="text" value={produto.descricao} id="descricao" onChange={atualizarValor} /><br /><br />
            <input type="text" id="data" value={produto.data} onChange={atualizarValor} /><br /><br />
            <button onClick={cadastrar}>Cadastrar</button><br /><br />
            <Button label="Enviar" />
        </>
    );
}
export default Cadastro;