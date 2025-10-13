import React, { useEffect, useRef } from 'react';

const CategoriaModal = ({ categoria, onClose }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!categoria) return null;

    return (
        <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="modal-content"
                onKeyDown={handleKeyDown}
                tabIndex={0}
                ref={contentRef}
                role="dialog"
                aria-modal="true"
            >
                <div className="modal-header">
                    <h2>Detalhes da Categoria</h2>
                    <button
                        className="close-btn"
                        onClick={onClose}
                        type="button"
                        aria-label="Fechar"
                    >
                        ×
                    </button>
                </div>

                <div className="categoria-details">
                    <div className="detail-group">
                        <label>ID:</label>
                        <p>{categoria.id}</p>
                    </div>

                    <div className="detail-group">
                        <label>Nome:</label>
                        <p>{categoria.nome}</p>
                    </div>

                    {categoria.observacao && (
                        <div className="detail-group">
                            <label>Observação:</label>
                            <p>{categoria.observacao}</p>
                        </div>
                    )}

                    {categoria.criador && (
                        <div className="detail-group">
                            <label>Criador:</label>
                            <p>
                                {categoria.criador.nome || categoria.criador.email || 'Não informado'}
                                {categoria.criador.email && categoria.criador.nome && (
                                    <small> ({categoria.criador.email})</small>
                                )}
                            </p>
                        </div>
                    )}

                    {categoria.dataCriacao && (
                        <div className="detail-group">
                            <label>Criada em:</label>
                            <p>{new Date(categoria.dataCriacao).toLocaleString()}</p>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                        type="button"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoriaModal;