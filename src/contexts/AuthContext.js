import React, { createContext, useContext, useState, useEffect } from 'react';

// Criar o contexto
const AuthContext = createContext();

// Hook customizado para usar o contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

// Provider do contexto
export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verificar se há usuário logado ao inicializar
    useEffect(() => {
        const usuarioLogado = localStorage.getItem("usuario");
        if (usuarioLogado) {
            try {
                setUsuario(JSON.parse(usuarioLogado));
            } catch (error) {
                console.error('Erro ao parsear dados do usuário:', error);
                localStorage.removeItem("usuario");
            }
        }
        setLoading(false);
    }, []);

    // Função para fazer login
    const login = (dadosUsuario) => {
        localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
        setUsuario(dadosUsuario);
    };

    // Função para fazer logout
    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    // Verificar se o usuário está logado
    const isLoggedIn = () => {
        return !!usuario;
    };

    const value = {
        usuario,
        login,
        logout,
        isLoggedIn,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
