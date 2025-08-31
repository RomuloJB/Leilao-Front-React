import React, { useState } from "react";
import './Login.css';
import AutenticacaoService from "../../services/AutenticacaoService";
import { useNavigate } from "react-router-dom";
import osmenottiImg from '../../assets/img/osmenotti.jpg';

const Login = () => {
    const autenticacaoService = new AutenticacaoService();
    const [usuario, setUsuario] = useState({ email: '', senha: '' });
    const [loading, setLoading] = useState(false);
    const [showSenha, setShowSenha] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const login = async () => {
        if (!usuario.email || !usuario.senha) {
            alert("Preencha email e senha.");
            return;
        }
        try {
            setLoading(true);
            const resposta = await autenticacaoService.login(usuario);
            if (resposta.status === 200 && resposta.data.token) {
                localStorage.setItem("usuario", JSON.stringify(resposta.data));
                navigate("/");
            } else {
                alert("Erro ao fazer login.");
            }
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.mensagem || "Falha no login.");
        } finally {
            setLoading(false);
        }
    };

    const onEnter = (e) => {
        if (e.key === 'Enter') login();
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <img src={osmenottiImg} alt="Osmenotti" className="login-image" />
            </div>

            <div className="login-right">
                <div className="login-card">
                    <h2>Entrar</h2>
                    <p className="subtitle">Informe suas credenciais</p>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={usuario.email}
                            onChange={handleChange}
                            onKeyDown={onEnter}
                            placeholder="seuemail@exemplo.com"
                            autoComplete="email"
                            className="login-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <div className="password-wrapper">
                            <input
                                id="senha"
                                type={showSenha ? "text" : "password"}
                                name="senha"
                                value={usuario.senha}
                                onChange={handleChange}
                                onKeyDown={onEnter}
                                placeholder="Sua senha"
                                autoComplete="current-password"
                                className="login-input"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className="login-btn"
                        onClick={login}
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                    <div className="links">
                        <span onClick={() => navigate("/recuperar-senha")}>Esqueci minha senha</span>
                        <span onClick={() => navigate("/cadastro")}>Criar conta</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;