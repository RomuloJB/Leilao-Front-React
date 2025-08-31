import React, { useState } from "react";
import './RecuperarSenha.css';
import AutenticacaoService from "../../services/AutenticacaoService";
import { useNavigate } from "react-router-dom";

const RecuperarSenha = () => {
    const autenticacaoService = new AutenticacaoService();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setEmail(e.target.value);

    const recuperarSenha = async () => {
        if (!email) {
            alert("Informe o e-mail.");
            return;
        }
        try {
            await autenticacaoService.recuperarSenha({ email });
            alert("E-mail de recuperação enviado com sucesso!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.mensagem || "Erro ao enviar e-mail de recuperação");
        }
    };

    const onEnter = (e) => {
        if (e.key === 'Enter') recuperarSenha();
    };

    return (
        <section className="wrapper-container">
            <div className="container">
                <h2>Recuperar Senha</h2>
                <p>Enviaremos uma mensagem ao email abaixo para que você consiga redefinir sua senha.</p>
                <label htmlFor="email-recuperacao">E-mail</label>
                <input
                    id="email-recuperacao"
                    type="email"
                    name="email"
                    className="input-email"
                    value={email}
                    onChange={handleChange}
                    onKeyDown={onEnter}
                    placeholder="seuemail@exemplo.com"
                    autoComplete="email"
                />
                <button type="button" className="btn-enviar" onClick={recuperarSenha}>
                    Enviar Link de Recuperação
                </button>
                <div className="txt-voltar">
                    <span onClick={() => navigate("/login")}>Voltar ao Login</span>

                </div>
            </div>
        </section>
    );
};

export default RecuperarSenha;