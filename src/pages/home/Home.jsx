import React, { useState, useEffect } from 'react';
import './Home.css';
import usmenottiImg from '../../assets/img/osmenotti.jpg';

const Home = () => {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        setTarefas(tarefas);
    }, []);

    return (
        <div className="home-container">
            <div className="banner-container">
                <img src={usmenottiImg} alt="Os Menotti - Leilão" className="banner-image" />
                <div className="banner-overlay">
                    <h1 className="banner-title">Bem-vindo ao RM Leilões</h1>
                    <p className="banner-subtitle">Eu vou fazer um leilão!</p>
                </div>
            </div>
            
            <div className="content">
                <h2>Leilões Recentes</h2>
                {tarefas.length > 0 ? (
                    <div className="tarefas-list">
                        {tarefas.map(tarefa => (
                            <div key={tarefa.id} className="tarefa-item">
                                <p>{tarefa.descricao}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-items">Nenhum leilão disponível no momento.</p>
                )}
            </div>
        </div>
    );
}
export default Home;
