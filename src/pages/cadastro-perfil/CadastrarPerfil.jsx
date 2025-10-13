import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PessoaService from "../../services/PessoaService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./CadastrarPerfil.css";

const CadastrarPerfil = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [showSenha, setShowSenha] = useState(false);
  const [showConfSenha, setShowConfSenha] = useState(false);

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setGlobalError("");
    setSuccessMsg("");
  };

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório.";
    if (!form.email.trim()) e.email = "Email é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido.";
    if (!form.senha) e.senha = "Senha é obrigatória.";
    else if (form.senha.length < 6) e.senha = "Senha deve ter ao menos 6 caracteres.";
    if (!form.confirmarSenha) e.confirmarSenha = "Confirmação de senha é obrigatória.";
    else if (form.confirmarSenha !== form.senha) e.confirmarSenha = "Senhas não coincidem.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setGlobalError("");
      setSuccessMsg("");
      await PessoaService.criar({
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        senha: form.senha,
      });
      setSuccessMsg("Conta criada com sucesso! Você já pode fazer login.");
      // Volta para a tela anterior (provavelmente Login) após um curto delay
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      const msg = err?.response?.data?.mensagem || "Falha ao criar conta. Tente novamente.";
      setGlobalError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastrar-perfil">
      <div className="cadastro-card">
        <h2>Criar Conta</h2>
        <p className="subtitle">Preencha seus dados para se cadastrar</p>

        {globalError && <div className="alert error">{globalError}</div>}
        {successMsg && <div className="alert success">{successMsg}</div>}

        <form onSubmit={onSubmit} className="cadastro-form">
          <div className="form-group">
            <label htmlFor="nome">Nome *</label>
            <input
              id="nome"
              name="nome"
              value={form.nome}
              onChange={onChange}
              placeholder="Seu nome completo"
              className={errors.nome ? "input error" : "input"}
              autoComplete="name"
            />
            {errors.nome && <span className="field-error">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="seuemail@exemplo.com"
              className={errors.email ? "input error" : "input"}
              autoComplete="email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha *</label>
            <div className="password-wrapper">
              <input
                id="senha"
                type={showSenha ? "text" : "password"}
                name="senha"
                value={form.senha}
                onChange={onChange}
                placeholder="Crie uma senha"
                className={errors.senha ? "input error" : "input"}
                autoComplete="new-password"
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
            {errors.senha && <span className="field-error">{errors.senha}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha *</label>
            <div className="password-wrapper">
              <input
                id="confirmarSenha"
                type={showConfSenha ? "text" : "password"}
                name="confirmarSenha"
                value={form.confirmarSenha}
                onChange={onChange}
                placeholder="Repita a senha"
                className={errors.confirmarSenha ? "input error" : "input"}
                autoComplete="new-password"
              />
            <button
                type="button"
                className="toggle-password-conf"
                onClick={() => setShowConfSenha((s) => !s)}
                aria-label={showConfSenha ? "Ocultar senha" : "Mostrar senha"}
                title={showConfSenha ? "Ocultar senha" : "Mostrar senha"}
            >
                {showConfSenha ? <FaEyeSlash /> : <FaEye />}
            </button>

            </div>
            {errors.confirmarSenha && <span className="field-error">{errors.confirmarSenha}</span>}
          </div>

          <button type="submit" className="cadastro-btn" disabled={loading}>
            {loading ? "Criando conta..." : "Criar conta"}
          </button>

          <div className="links">
            <span onClick={() => navigate(-1)}>Voltar para o login</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarPerfil;