import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './novoCadastro.css';

function NovoCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [translations, setTranslations] = useState({});

  // Carregar traduções com base no idiomaAtual
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`json/${window.idiomaAtual}.json`);
        if (!response.ok) throw new Error('Falha ao carregar traduções');
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Erro ao carregar traduções:', error);
      }
    };
    loadTranslations();

    // Ouvir mudanças de idioma
    const handleLanguageChange = () => {
      loadTranslations();
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Lidar com envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !email) {
      alert(translations.error_empty_fields || 'Por favor, preencha todos os campos');
      return;
    }
    // Simular adição aos inscritos
    const divInscritos = document.getElementById('inscritos');
    if (divInscritos) {
      const novoParagrafo = document.createElement('p');
      novoParagrafo.textContent = `Nome: ${nome}`;
      divInscritos.appendChild(novoParagrafo);
    }
    // Resetar formulário
    setNome('');
    setEmail('');
    alert(translations.success_message || 'Cadastro realizado com sucesso!');
  };

  // Lidar com cancelamento
  const handleCancel = () => {
    setNome('');
    setEmail('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title" data-i18n="new_registration_title">
          {translations.new_registration_title || 'Novo Cadastro'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome" data-i18n="name_label">
              {translations.name_label || 'Nome'}
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder={translations.name_placeholder || 'Digite seu nome'}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" data-i18n="email_label">
              {translations.email_label || 'E-mail'}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={translations.email_placeholder || 'Digite seu e-mail'}
              required
            />
          </div>
          <div className="form-buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="login-button cancel-button"
              data-i18n="cancel_button"
            >
              {translations.cancel_button || 'Cancelar'}
            </button>
            <button
              type="submit"
              className="login-button"
              data-i18n="register_button"
            >
              {translations.register_button || 'Cadastrar'}
            </button>
          </div>
        </form>
        <div className="login-options">
          <Link to="/" className="link" data-i18n="back_to_login">
            {translations.back_to_login || 'Voltar para o Login'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NovoCadastro;