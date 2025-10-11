import React from 'react';
import './Header.css';

//const Header =({nome})=>{
const Header = (params) => {
    const {nome, idade} = params;
    return(
        <>
        
            <div className="header">
                <h1>RM Leilões🔨</h1>
                <div className="menu-opcoes">
                    <p>Agenda</p>
                    <p>Quero vender</p>
                    <p>Categorias</p>
                    <p>Quem somos</p>
                </div>

                <p className="conta">Minha conta</p>
            </div>
        </>
    );
}
export default Header;