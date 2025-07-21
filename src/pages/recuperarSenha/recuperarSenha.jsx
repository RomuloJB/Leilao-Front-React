import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './recuperarSenha.css';

function RecuperarSenha() {
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
    if (!email) {
      alert(translations.error_empty_email || 'Por favor, insira seu e-mail');
      return;
    }
    // Simular ação de recuperação de senha
    console.log('Solicitação de recuperação de senha para:', { email });
    alert(translations.recovery_success || 'E-mail de recuperação enviado! Verifique sua caixa de entrada.');
    setEmail('');
  };

  // Lidar com cancelamento
  const handleCancel = () => {
    setEmail('');
  };

  return (
    <div className="recuperar-senha-container">
      <div className="recuperar-senha-box">
        <h2 className="recuperar-senha-title" data-i18n="recover_password_title">
          {translations.recover_password_title || 'Recuperar Senha'}
        </h2>
        <p className="recuperar-senha-descricao" data-i18n="recover_password_description">
            Enviaremos uma mensagem para o email abaixo para seguir com o processo de recuperação de senha.
        </p>
        <form onSubmit={handleSubmit}>
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
              className="recuperar-senha-button cancel-button"
              data-i18n="cancel_button"
            >
              {translations.cancel_button || 'Cancelar'}
            </button>
            <button
              type="submit"
              className="recuperar-senha-button"
              data-i18n="recover_button"
            >
              {translations.recover_button || 'Recuperar Senha'}
            </button>
          </div>
        </form>
        <div className="recuperar-senha-options">
          <Link to="/" className="link" data-i18n="back_to_login">
            {translations.back_to_login || 'Voltar para o Login'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenha;