import React from 'react';

const CategoriaList = ({
    categorias,
    loading,
    onEdit,
    onDelete,
    onView,
    onLoadMore,
    hasMore
}) => {
    if (loading && categorias.length === 0) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando categorias...</p>
            </div>
        );
    }

    if (!loading && categorias.length === 0) {
        return (
            <div className="empty-state">
                <h3>Nenhuma categoria encontrada</h3>
                <p>Não há categorias cadastradas ou a busca não retornou resultados.</p>
            </div>
        );
    }

    return (
        <div className="categoria-list">
            {categorias.map((categoria) => (
                <div key={categoria.id} className="categoria-item">
                    <div className="categoria-info">
                        <h3>{categoria.nome}</h3>
                        {categoria.observacao && (
                            <p>{categoria.observacao}</p>
                        )}
                        {categoria.criador && (
                            <small>Criado por: {categoria.criador.nome || categoria.criador.email}</small>
                        )}
                    </div>
                    <div className="categoria-actions">
                        <button
                            className="btn btn-warning btn-small"
                            onClick={() => onView(categoria)}
                            title="Ver detalhes"
                        >
                            👁️ Ver
                        </button>
                        <button
                            className="btn btn-secondary btn-small"
                            onClick={() => onEdit(categoria)}
                            title="Editar"
                        >
                            ✏️ Editar
                        </button>
                        <button
                            className="btn btn-danger btn-small"
                            onClick={() => onDelete(categoria)}
                            title="Excluir"
                        >
                            🗑️ Excluir
                        </button>
                    </div>
                </div>
            ))}

            {hasMore && (
                <div className="load-more-container">
                    <button
                        className="btn btn-secondary"
                        onClick={onLoadMore}
                        disabled={loading}
                    >
                        {loading ? 'Carregando...' : 'Carregar mais'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoriaList;