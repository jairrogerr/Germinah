import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Droplets, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Edit,
  Trash2,
  Sprout
} from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  type: string;
  humidity: number;
  lastIrrigation: string;
  status: 'healthy' | 'needs-water' | 'overwatered';
  image: string;
}

const Plants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: '',
    type: '',
    minHumidity: 40
  });

  const [plants, setPlantas] = useState<Plant[]>([
    {
      id: '1',
      name: 'Manjericão',
      type: 'Erva aromática',
      humidity: 65,
      lastIrrigation: '2 horas atrás',
      status: 'healthy',
      image: '🌿'
    },
    {
      id: '2',
      name: 'Alface',
      type: 'Folhosa',
      humidity: 32,
      lastIrrigation: '6 horas atrás',
      status: 'needs-water',
      image: '🥬'
    },
    {
      id: '3',
      name: 'Tomate Cereja',
      type: 'Fruto',
      humidity: 58,
      lastIrrigation: '3 horas atrás',
      status: 'healthy',
      image: '🍅'
    },
    {
      id: '4',
      name: 'Salsa',
      type: 'Erva aromática',
      humidity: 78,
      lastIrrigation: '1 hora atrás',
      status: 'overwatered',
      image: '🌱'
    },
    {
      id: '5',
      name: 'Rúcula',
      type: 'Folhosa',
      humidity: 52,
      lastIrrigation: '4 horas atrás',
      status: 'healthy',
      image: '🥗'
    },
    {
      id: '6',
      name: 'Cebolinha',
      type: 'Erva aromática',
      humidity: 45,
      lastIrrigation: '5 horas atrás',
      status: 'healthy',
      image: '🧅'
    }
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'healthy':
        return {
          label: 'Saudável',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: CheckCircle
        };
      case 'needs-water':
        return {
          label: 'Precisa de água',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: AlertTriangle
        };
      case 'overwatered':
        return {
          label: 'Muita água',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: Droplets
        };
      default:
        return {
          label: 'Desconhecido',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: CheckCircle
        };
    }
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || plant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddPlant = () => {
    if (newPlant.name && newPlant.type) {
      const plant: Plant = {
        id: Date.now().toString(),
        name: newPlant.name,
        type: newPlant.type,
        humidity: Math.floor(Math.random() * 40) + 40, // Random humidity between 40-80
        lastIrrigation: 'Nunca',
        status: 'healthy',
        image: '🌱'
      };
      
      setPlantas([...plants, plant]);
      setNewPlant({ name: '', type: '', minHumidity: 40 });
      setShowAddModal(false);
    }
  };

  const handleDeletePlant = (id: string) => {
    setPlantas(plants.filter(plant => plant.id !== id));
  };

  const statusCounts = {
    all: plants.length,
    healthy: plants.filter(p => p.status === 'healthy').length,
    'needs-water': plants.filter(p => p.status === 'needs-water').length,
    overwatered: plants.filter(p => p.status === 'overwatered').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Plantas</h1>
          <p className="text-gray-600 mt-1">Gerencie e monitore suas plantas</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Adicionar Planta
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{statusCounts.all}</div>
          <div className="text-gray-600 text-sm">Total</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-2xl font-bold text-green-600">{statusCounts.healthy}</div>
          <div className="text-green-700 text-sm">Saudáveis</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="text-2xl font-bold text-red-600">{statusCounts['needs-water']}</div>
          <div className="text-red-700 text-sm">Precisam de água</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{statusCounts.overwatered}</div>
          <div className="text-blue-700 text-sm">Muita água</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar plantas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">Todas</option>
            <option value="healthy">Saudáveis</option>
            <option value="needs-water">Precisam de água</option>
            <option value="overwatered">Muita água</option>
          </select>
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map((plant) => {
          const statusInfo = getStatusInfo(plant.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <div
              key={plant.id}
              className={`bg-white rounded-xl p-6 shadow-lg border-2 ${statusInfo.borderColor} hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{plant.image}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{plant.name}</h3>
                    <p className="text-gray-600 text-sm">{plant.type}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeletePlant(plant.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className={`${statusInfo.bgColor} rounded-lg p-3 mb-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <StatusIcon className={`h-5 w-5 ${statusInfo.color} mr-2`} />
                    <span className={`text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{plant.humidity}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Umidade atual:</span>
                  <span className="font-medium text-gray-900">{plant.humidity}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Última irrigação:</span>
                  <span className="font-medium text-gray-900">{plant.lastIrrigation}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center">
                <Droplets className="h-4 w-4 mr-2" />
                Irrigar Agora
              </button>
            </div>
          );
        })}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <Sprout className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma planta encontrada</h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus !== 'all' 
              ? 'Tente ajustar os filtros de busca'
              : 'Adicione sua primeira planta para começar'
            }
          </p>
        </div>
      )}

      {/* Add Plant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Adicionar Nova Planta</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Planta
                </label>
                <input
                  type="text"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({...newPlant, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: Manjericão"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={newPlant.type}
                  onChange={(e) => setNewPlant({...newPlant, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Erva aromática">Erva aromática</option>
                  <option value="Folhosa">Folhosa</option>
                  <option value="Fruto">Fruto</option>
                  <option value="Raiz">Raiz</option>
                  <option value="Flor">Flor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Umidade Mínima (%)
                </label>
                <input
                  type="number"
                  min="20"
                  max="80"
                  value={newPlant.minHumidity}
                  onChange={(e) => setNewPlant({...newPlant, minHumidity: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddPlant}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plants;