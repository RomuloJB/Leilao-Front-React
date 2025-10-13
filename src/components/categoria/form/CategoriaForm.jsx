import React, { useState, useEffect } from 'react';

const CategoriaForm = ({ categoria, isEdit, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        observacao: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categoria) {
            setFormData({
                nome: categoria.nome || '',
                observacao: categoria.observacao || ''
            });
        }
    }, [categoria]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpar erro do campo quando o usuário digitar
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validação do nome
        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        } else if (formData.nome.trim().length < 2) {
            newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
        } else if (formData.nome.trim().length > 50) {
            newErrors.nome = 'Nome deve ter no máximo 50 caracteres';
        }

        // Validação da observação
        if (formData.observacao && formData.observacao.length > 255) {
            newErrors.observacao = 'Observação deve ter no máximo 255 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const dadosParaSalvar = {
                nome: formData.nome.trim(),
                observacao: formData.observacao.trim() || null
            };

            await onSave(dadosParaSalvar);
        } catch (error) {
            console.error('Erro ao salvar:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content" onKeyDown={handleKeyDown} tabIndex="0">
                <div className="modal-header">
                    <h2>{isEdit ? 'Editar Categoria' : 'Nova Categoria'}</h2>
                    <button
                        className="close-btn"
                        onClick={onClose}
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${errors.nome ? 'error' : ''}`}>
                        <label htmlFor="nome">
                            Nome *
                        </label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite o nome da categoria"
                            maxLength="50"
                            autoFocus
                        />
                        {errors.nome && (
                            <div className="form-error">{errors.nome}</div>
                        )}
                        <small>
                            {formData.nome.length}/50 caracteres
                        </small>
                    </div>

                    <div className={`form-group ${errors.observacao ? 'error' : ''}`}>
                        <label htmlFor="observacao">
                            Observação
                        </label>
                        <textarea
                            id="observacao"
                            name="observacao"
                            value={formData.observacao}
                            onChange={handleChange}
                            placeholder="Digite uma observação (opcional)"
                            rows="4"
                            maxLength="255"
                        />
                        {errors.observacao && (
                            <div className="form-error">{errors.observacao}</div>
                        )}
                        <small>
                            {formData.observacao.length}/255 caracteres
                        </small>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Salvando...' : (isEdit ? 'Atualizar' : 'Criar')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoriaForm;