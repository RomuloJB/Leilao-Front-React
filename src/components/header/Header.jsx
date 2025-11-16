import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { usuario, logout } = useAuth();
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const [mostrarPopupSair, setMostrarPopupSair] = useState(false);

    // Fechar dropdown quando clicar fora
    useEffect(() => {
        const fecharDropdown = (event) => {
            if (dropdownAberto && !event.target.closest('.perfil-dropdown')) {
                setDropdownAberto(false);
            }
        };

        document.addEventListener('click', fecharDropdown);
        return () => document.removeEventListener('click', fecharDropdown);
    }, [dropdownAberto]);

    // Função para fazer logout
    const handleLogout = () => {
        logout();
        setDropdownAberto(false);
        setMostrarPopupSair(false);
        navigate("/");
    };

    // Função para abrir popup de confirmação
    const confirmarSair = () => {
        setMostrarPopupSair(true);
        setDropdownAberto(false);
    };

    // Função para ir ao perfil
    const irParaPerfil = () => {
        setDropdownAberto(false);
        navigate('/perfil');
    };

    return(
        <>
            <div className="header">
                <h1 onClick={() => navigate('/')} className="logo">RM Leilões🔨</h1>
                <div className="menu-opcoes">
                    <p>Agenda</p>
                    <p>Quero vender</p>
                    <p>Categorias</p>
                    <p onClick={() => navigate('/quem-somos')}>Quem somos</p>
                </div>

                <div className="opcoes-de-conta">
                    {!usuario ? (
                        // Usuário não logado - mostrar Login
                        <p onClick={() => navigate('/login')}>Login</p>
                    ) : (
                        // Usuário logado - mostrar Meu Perfil com dropdown
                        <div className="perfil-dropdown">
                            <div 
                                className="perfil-trigger"
                                onClick={() => setDropdownAberto(!dropdownAberto)}
                            >
                                <FaUser className="user-icon" />
                                <span>Meu Perfil</span>
                                <FaChevronDown className={`chevron ${dropdownAberto ? 'rotated' : ''}`} />
                            </div>
                            
                            {dropdownAberto && (
                                <div className="dropdown-content">
                                    <div className="usuario-info">
                                        <p className="nome-usuario">{usuario.nome || usuario.email}</p>
                                        <p className="email-usuario">{usuario.email}</p>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <button onClick={irParaPerfil} className="dropdown-item">
                                        <FaUser /> Meus Dados
                                    </button>
                                    <button onClick={confirmarSair} className="dropdown-item sair">
                                        <FaSignOutAlt /> Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Popup de confirmação para sair */}
            {mostrarPopupSair && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Confirmar Saída</h3>
                        <p>Tem certeza que deseja sair da sua conta?</p>
                        <div className="popup-buttons">
                            <button 
                                onClick={() => setMostrarPopupSair(false)}
                                className="btn-cancelar"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="btn-confirmar"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default Header;