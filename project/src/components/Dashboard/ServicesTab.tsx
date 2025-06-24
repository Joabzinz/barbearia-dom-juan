import React, { useState } from 'react';
import { 
  Scissors, 
  Plus, 
  Edit3, 
  Trash2, 
  DollarSign,
  Clock,
  Users,
  Search,
  Filter,
  Save,
  X,
  Check,
  TrendingUp,
  Star
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
  popularity: number;
  totalRevenue: number;
  totalBookings: number;
  averageRating: number;
}

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino',
    description: 'Corte tradicional com acabamento profissional',
    price: 35.00,
    duration: 30,
    category: 'Cortes',
    isActive: true,
    popularity: 85,
    totalRevenue: 3500,
    totalBookings: 100,
    averageRating: 4.8
  },
  {
    id: '2',
    name: 'Corte + Barba',
    description: 'Corte completo com barba e acabamento',
    price: 50.00,
    duration: 60,
    category: 'Combos',
    isActive: true,
    popularity: 92,
    totalRevenue: 7250,
    totalBookings: 145,
    averageRating: 4.9
  },
  {
    id: '3',
    name: 'Barba Completa',
    description: 'Aparar, modelar e finalizar a barba',
    price: 25.00,
    duration: 30,
    category: 'Barba',
    isActive: true,
    popularity: 70,
    totalRevenue: 1675,
    totalBookings: 67,
    averageRating: 4.7
  },
  {
    id: '4',
    name: 'Sobrancelha Masculina',
    description: 'Design e limpeza das sobrancelhas',
    price: 15.00,
    duration: 15,
    category: 'Estética',
    isActive: true,
    popularity: 45,
    totalRevenue: 345,
    totalBookings: 23,
    averageRating: 4.6
  },
  {
    id: '5',
    name: 'Tratamento Capilar',
    description: 'Hidratação e tratamento para cabelos',
    price: 40.00,
    duration: 45,
    category: 'Tratamentos',
    isActive: true,
    popularity: 35,
    totalRevenue: 800,
    totalBookings: 20,
    averageRating: 4.5
  },
  {
    id: '6',
    name: 'Corte Infantil',
    description: 'Corte especial para crianças até 12 anos',
    price: 25.00,
    duration: 25,
    category: 'Cortes',
    isActive: true,
    popularity: 60,
    totalRevenue: 750,
    totalBookings: 30,
    averageRating: 4.8
  }
];

const categories = ['Todos', 'Cortes', 'Barba', 'Combos', 'Estética', 'Tratamentos'];

export const ServicesTab: React.FC = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('popularity');

  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    description: '',
    price: 0,
    duration: 30,
    category: 'Cortes',
    isActive: true
  });

  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'price':
          return b.price - a.price;
        case 'revenue':
          return b.totalRevenue - a.totalRevenue;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const totalRevenue = services.reduce((acc, service) => acc + service.totalRevenue, 0);
  const totalBookings = services.reduce((acc, service) => acc + service.totalBookings, 0);
  const averagePrice = services.reduce((acc, service) => acc + service.price, 0) / services.length;
  const activeServices = services.filter(service => service.isActive).length;

  const handleAddService = () => {
    if (newService.name && newService.price && newService.duration) {
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name,
        description: newService.description || '',
        price: newService.price,
        duration: newService.duration,
        category: newService.category || 'Cortes',
        isActive: true,
        popularity: 0,
        totalRevenue: 0,
        totalBookings: 0,
        averageRating: 0
      };
      
      setServices([...services, service]);
      setNewService({
        name: '',
        description: '',
        price: 0,
        duration: 30,
        category: 'Cortes',
        isActive: true
      });
      setShowAddService(false);
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService({ ...service });
  };

  const handleSaveEdit = () => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id ? editingService : service
      ));
      setEditingService(null);
    }
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cortes': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Barba': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Combos': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Estética': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      case 'Tratamentos': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Serviços</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie todos os serviços oferecidos pela sua barbearia
          </p>
        </div>
        <button
          onClick={() => setShowAddService(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Serviço</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Serviços Ativos</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{activeServices}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">de {services.length} total</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <Scissors className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Receita Total</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                R$ {totalRevenue.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Todos os serviços</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Agendamentos</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalBookings}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Histórico completo</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Preço Médio</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                R$ {averagePrice.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Por serviço</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
              <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar serviços..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="popularity">Popularidade</option>
              <option value="price">Preço</option>
              <option value="revenue">Receita</option>
              <option value="name">Nome</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                      {service.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => toggleServiceStatus(service.id)}
                    className={`p-1 rounded-full transition-colors duration-200 ${
                      service.isActive 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    R$ {service.price.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Preço</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {service.duration}min
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Duração</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Popularidade</span>
                  <span className="font-medium text-gray-900 dark:text-white">{service.popularity}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${service.popularity}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600 dark:text-gray-400 mb-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{service.totalBookings}</p>
                  <p>Agendamentos</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    R$ {service.totalRevenue.toLocaleString('pt-BR')}
                  </p>
                  <p>Receita</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white flex items-center justify-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    {service.averageRating.toFixed(1)}
                  </p>
                  <p>Avaliação</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditService(service)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 px-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Editar</span>
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 px-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Scissors className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Nenhum serviço encontrado com os filtros aplicados
          </p>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Novo Serviço
              </h3>
              <button
                onClick={() => setShowAddService(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddService(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  value={newService.name || ''}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ex: Corte Masculino"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={newService.description || ''}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Descrição do serviço..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newService.price || ''}
                    onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0,00"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duração (min)
                  </label>
                  <input
                    type="number"
                    value={newService.duration || ''}
                    onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="30"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  value={newService.category || 'Cortes'}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.filter(cat => cat !== 'Todos').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddService(false)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Editar Serviço
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duração (min)
                  </label>
                  <input
                    type="number"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.filter(cat => cat !== 'Todos').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};