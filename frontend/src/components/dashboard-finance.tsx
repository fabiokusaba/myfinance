import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, X, DollarSign } from 'lucide-react';
import type { Finance } from '../models/Finance';
import { financeService } from '../services/financeService';
import { tiposFinanca } from '../models/TiposFinanca';
import { formatCurrency } from '../format/currency';
import { getTipoInfo } from '../helpers/get-info';

const PersonalFinanceManager = () => {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [currentFinance, setCurrentFinance] = useState({
    id: null,
    nome: '',
    descricao: '',
    valor: '',
    tipo: 'SALARIO'
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');

  useEffect(() => {
    getAll();
  }, []);

const create = async (data: Finance) => {
  try {
    const response = await financeService.create(data);
    return response;
  } catch (error) {
    console.error('💥 Error creating finance:', error);
    throw error;
  }
};

const getAll = async () => {
  try {
    const response = await financeService.getAll();
    setFinances(response);
  } catch (error) {
    console.error('Error fetching finances:', error);
  }
};

const getOne = async (id: number) => {
  try {
    const response = await financeService.getOne(id);
    return response;
  } catch (error) {
    console.error('Error fetching finance:', error);
    return null;
  }
};

const update = async (id: number, data: Finance) => {
  try {
    const response = await financeService.update(id, data);
    return response;
  } catch (error) {
    console.error('Error updating finance:', error);
    return null;
  }
};

  const remove = async (id: number) => {
    try {
      const response = await financeService.delete(id);
      return response;
    } catch (error) {
      console.error('Error deleting finance:', error);
      return null;
    }
  }

  const resetForm = () => {
    setCurrentFinance({
      id: null,
      nome: '',
      descricao: '',
      valor: '',
      tipo: 'SALARIO'
    });
  };

  const openModal = (mode: string, finance?: Finance) => {
    setModalMode(mode);
    if (finance) {
      setCurrentFinance({ ...finance });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!currentFinance.nome || !currentFinance.valor || !currentFinance.tipo) {
      alert('Nome, tipo e valor são obrigatórios!');
      return;
    }

    if (modalMode === 'create') {
      e.preventDefault();

      const formData = {
        ...currentFinance,
        valor: parseFloat(currentFinance.valor)
      };

      const result = await create(formData);

      if (result) {
        getAll();
      }
    } else if (modalMode === 'edit') {
      e.preventDefault();

      getOne(currentFinance.id);

      const formData = {
        ...currentFinance,
        valor: parseFloat(currentFinance.valor)
      };

      const result = await update(currentFinance.id, formData);

      if (result) {
        getAll();
      }
    }
    
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta finança?')) {
      remove(id);
      setFinances(finances.filter(f => f.id !== id));
    }
  };

  const getTotalByType = (tipo: string) => {
    return finances
      .filter(f => f.tipo === tipo)
      .reduce((sum, f) => sum + f.valor, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Finanças Pessoais</h1>
                <p className="text-gray-600">Gerencie suas receitas e despesas</p>
              </div>
            </div>
            <button
              onClick={() => openModal('create')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nova Finança
            </button>
          </div>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {tiposFinanca.map(tipo => {
            const total = getTotalByType(tipo.value);
            const Icon = tipo.icon;
            return (
              <div key={tipo.value} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 ${tipo.color}`} />
                  <span className="text-sm font-medium text-gray-700">{tipo.label}</span>
                </div>
                <p className="text-lg font-bold text-gray-800">{formatCurrency(total)}</p>
              </div>
            );
          })}
        </div>

        {/* Lista de Finanças */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Lista de Finanças
            </h2>
          </div>
          
          {finances.length === 0 ? (
            <div className="p-12 text-center">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">Nenhuma finança cadastrada</h3>
              <p className="text-gray-400 mb-4">Comece adicionando sua primeira entrada financeira</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {finances.map((finance: Finance) => {
                    const tipoInfo = getTipoInfo(finance.tipo);
                    const Icon = tipoInfo.icon;
                    return (
                      <tr key={finance.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-5 h-5 ${tipoInfo.color}`} />
                            <span className="text-sm font-medium text-gray-900">{tipoInfo.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{finance.nome}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {finance.descricao || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">
                            {formatCurrency(finance.valor)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openModal('view', finance)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                              title="Visualizar"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openModal('edit', finance)}
                              className="text-indigo-600 hover:text-indigo-800 p-1 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(finance.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {modalMode === 'create' && 'Nova Finança'}
                  {modalMode === 'edit' && 'Editar Finança'}
                  {modalMode === 'view' && 'Detalhes da Finança'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={currentFinance.nome}
                    onChange={(e) => setCurrentFinance({...currentFinance, nome: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: Conta de luz"
                    disabled={modalMode === 'view'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    value={currentFinance.tipo}
                    onChange={(e) => setCurrentFinance({...currentFinance, tipo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={modalMode === 'view'}
                  >
                    {tiposFinanca.map(tipo => (
                      <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={currentFinance.valor}
                    onChange={(e) => setCurrentFinance({...currentFinance, valor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                    disabled={modalMode === 'view'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={currentFinance.descricao}
                    onChange={(e) => setCurrentFinance({...currentFinance, descricao: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                    placeholder="Descrição opcional..."
                    disabled={modalMode === 'view'}
                  />
                </div>
              </div>

              {modalMode !== 'view' && (
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {modalMode === 'create' ? 'Cadastrar' : 'Atualizar'}
                  </button>
                </div>
              )}

              {modalMode === 'view' && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalFinanceManager;