import React, { useState } from "react";
import './Login.css';
import AutenticacaoService from "../../services/AutenticacaoService";
import { useNavigate } from "react-router-dom";
import osmenottiImg from '../../assets/img/osmenotti.jpg';
import { FaEye, FaEyeSlash } from "react-icons/fa";


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
                <div className="login-card">
                    <h2>Login</h2>
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
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowSenha((s) => !s)}
                                aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                                title={showSenha ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {showSenha ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="links">
                        <span onClick={() => navigate("/recuperar-senha")}>Esqueci minha senha</span>
                        <span onClick={() => navigate("/cadastrar-perfil")}>Criar Conta</span>
                    </div>

                    <button
                        type="button"
                        className="login-btn"
                        onClick={login}
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </div>
            </div>
    );
};

export default Login;