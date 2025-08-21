import React, { useState } from "react";
import './RecuperarSenha.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import AutenticacaoService from "../../services/AutenticacaoService";
import { useNavigate } from "react-router-dom";

const RecuperarSenha = () => {
    const autenticacaoService = new AutenticacaoService();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const recuperarSenha = async () => {
        try {
            // Simula chamada ao serviço de recuperação de senha
            await autenticacaoService.recuperarSenha({ email });
            alert("E-mail de recuperação enviado com sucesso!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.mensagem || "Erro ao enviar e-mail de recuperação");
        }
    };

    return (
        <div className="container">
            <h2>Recuperar Senha</h2>
            <label>E-mail</label>
            <InputText value={email} name="email" onChange={handleChange} />
            <br />
            <Button label="Enviar Link de Recuperação" onClick={recuperarSenha} />
            <p className="p-button-text" onClick={() => navigate("/login")}>Voltar ao Login</p>
        </div>
    );
};

export default RecuperarSenha;