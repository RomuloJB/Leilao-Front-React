import React from 'react';
import './Header.css';
import {useNavigate} from 'react-router-dom';

//const Header =({nome})=>{
const Header = () => {
    const navigate = useNavigate();
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
                    <p onClick={() => navigate(('/login'))}>Login</p>
                    <p>Meu perfil</p>
                </div>
            </div>
        </>
    );
}
export default Header;