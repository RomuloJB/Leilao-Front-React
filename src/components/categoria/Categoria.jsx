import React, { useState, useEffect } from 'react';
import './Categoria.css';
import CategoriaService from '../../services/CategoriaService';
import CategoriaForm from '../../components/categoria/form/CategoriaForm';
import CategoriaModal from '../../components/categoria/modal/CategoriaModal';
import CategoriaList from '../../components/categoria/list/CategoriaList';

const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const categoriaService = new CategoriaService();

    useEffect(() => {
        carregarCategorias();
    }, []);

    const carregarCategorias = async (reset = true) => {
        setLoading(true);
        try {
            const currentPage = reset ? 0 : page;
            const resposta = await categoriaService.buscarTodos();

            if (reset) {
                setCategorias(resposta.data || []);
                setPage(0);
            } else {
                setCategorias(prev => [...prev, ...(resposta.data || [])]);
            }

            // Simular paginação (ajustar quando o backend implementar)
            setHasMore(false);
        } catch (error) {
            showToast('Erro ao carregar categorias', 'error');
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const buscarCategorias = async () => {
        if (!searchTerm.trim()) {
            carregarCategorias();
            return;
        }

        setLoading(true);
        try {
            const resposta = await categoriaService.buscarPorNome(searchTerm);
            setCategorias(resposta.data || []);
        } catch (error) {
            showToast('Erro ao buscar categorias', 'error');
        } finally {
            setLoading(false);
        }
    };

    const abrirForm = (categoria = null) => {
        setSelectedCategoria(categoria);
        setIsEdit(!!categoria);
        setShowForm(true);
    };

    const fecharForm = () => {
        setShowForm(false);
        setSelectedCategoria(null);
        setIsEdit(false);
    };

    const abrirModal = (categoria) => {
        setSelectedCategoria(categoria);
        setShowModal(true);
    };

    const fecharModal = () => {
        setShowModal(false);
        setSelectedCategoria(null);
    };

    const salvarCategoria = async (dados) => {
        try {
            if (isEdit) {
                await categoriaService.alterarPorId(selectedCategoria.id, dados);
                showToast('Categoria atualizada com sucesso!', 'success');
            } else {
                await categoriaService.inserir(dados);
                showToast('Categoria criada com sucesso!', 'success');
            }

            fecharForm();
            carregarCategorias();
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao salvar categoria';
            showToast(message, 'error');
        }
    };

    const confirmarExclusao = (categoria) => {
        const confirmacao = window.confirm(`Tem certeza que deseja excluir a categoria "${categoria.nome}"?`);
        if (confirmacao) {
            excluirCategoria(categoria.id);
        }
    };

    const excluirCategoria = async (id) => {
        try {
            await categoriaService.excluir(id);
            showToast('Categoria excluída com sucesso!', 'success');
            carregarCategorias();
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao excluir categoria';
            showToast(message, 'error');
        }
    };

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 4000);
    };

    const carregarMais = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
            carregarCategorias(false);
        }
    };

    return (
        <div className="categorias-container">
            <div className="categorias-header">
                <h1>Gerenciar Categorias</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => abrirForm()}
                >
                    Nova Categoria
                </button>
            </div>

            <div className="categorias-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Buscar por nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && buscarCategorias()}
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={buscarCategorias}
                    >
                        Buscar
                    </button>
                    {searchTerm && (
                        <button
                            className="btn btn-clear"
                            onClick={() => {
                                setSearchTerm('');
                                carregarCategorias();
                            }}
                        >
                            Limpar
                        </button>
                    )}
                </div>
            </div>

            <CategoriaList
                categorias={categorias}
                loading={loading}
                onEdit={abrirForm}
                onDelete={confirmarExclusao}
                onView={abrirModal}
                onLoadMore={carregarMais}
                hasMore={hasMore}
            />

            {showForm && (
                <CategoriaForm
                    categoria={selectedCategoria}
                    isEdit={isEdit}
                    onSave={salvarCategoria}
                    onClose={fecharForm}
                />
            )}

            {showModal && (
                <CategoriaModal
                    categoria={selectedCategoria}
                    onClose={fecharModal}
                />
            )}

            {toast.show && (
                <div className={`toast toast-${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default Categoria;