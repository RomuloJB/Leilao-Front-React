import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './alterarSenha.css';

function AlterarSenha() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialEmail = queryParams.get('email') || '';
  const initialCode = queryParams.get('code') || '';

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(initialCode);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [translations, setTranslations] = useState({
    change_password_title: 'Alterar Senha',
    email_label: 'E-mail',
    email_placeholder: 'Digite seu e-mail',
    code_label: 'Código de Verificação',
    code_placeholder: 'Digite o código recebido',
    new_password_label: 'Nova Senha',
    new_password_placeholder: 'Digite a nova senha',
    confirm_password_label: 'Confirmar Senha',
    confirm_password_placeholder: 'Confirme a nova senha',
    cancel_button: 'Cancelar',
    change_password_button: 'Alterar Senha',
    error_empty_fields: 'Por favor, preencha todos os campos',
    error_password_mismatch: 'As senhas não coincidem',
    change_success: 'Senha alterada com sucesso!',
    back_to_login: 'Voltar para o Login'
  });

  // Load translations based on idiomaAtual
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`json/${window.idiomaAtual}.json`);
        if (!response.ok) throw new Error('Failed to load translations');
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    loadTranslations();

    // Listen for language changes
    const handleLanguageChange = () => {
      loadTranslations();
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !code || !newPassword || !confirmPassword) {
      alert(translations.error_empty_fields);
      return;
    }
    if (newPassword !== confirmPassword) {
      alert(translations.error_password_mismatch);
      return;
    }
    // Simulate password change action
    console.log('Password change requested:', { email, code, newPassword });
    alert(translations.change_success);
    setEmail('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Handle cancel
  const handleCancel = () => {
    setEmail(initialEmail);
    setCode(initialCode);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title" data-i18n="change_password_title">
          {translations.change_password_title}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" data-i18n="email_label">
              {translations.email_label}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={translations.email_placeholder}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="code" data-i18n="code_label">
              {translations.code_label}
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={translations.code_placeholder}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="new-password" data-i18n="new_password_label">
              {translations.new_password_label}
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={translations.new_password_placeholder}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password" data-i18n="confirm_password_label">
              {translations.confirm_password_label}
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={translations.confirm_password_placeholder}
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
              {translations.cancel_button}
            </button>
            <button
              type="submit"
              className="login-button"
              data-i18n="change_password_button"
            >
              {translations.change_password_button}
            </button>
          </div>
        </form>
        <div className="login-options">
          <Link to="/" className="link" data-i18n="back_to_login">
            {translations.back_to_login}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlterarSenha;