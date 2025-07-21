import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [translations, setTranslations] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title" data-i18n="login_title">
          {translations.login_title || 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" data-i18n="email_label">
              {translations.email_label || 'Email'}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={translations.email_placeholder || 'Enter your email'}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" data-i18n="password_label">
              {translations.password_label || 'Password'}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={translations.password_placeholder || 'Enter your password'}
              required
            />
          </div>
          <button
            type="submit"
            className="login-button"
            data-i18n="login_button"
          >
            {translations.login_button || 'Login'}
          </button>
        </form>
        <div className="login-options">
          <Link to="/register" className="link" data-i18n="register_link">
            {translations.register_link || 'Register'}
          </Link>
          <Link to="/recover-password" className="link" data-i18n="recover_password_link">
            {translations.recover_password_link || 'Recover Password'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;