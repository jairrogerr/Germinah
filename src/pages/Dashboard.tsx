import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Thermometer, 
  Clock, 
  Play, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Sprout,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isIrrigating, setIsIrrigating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const user = JSON.parse(localStorage.getItem('germinah_user') || '{"name": "Usuário"}');

  // Mock data for humidity chart
  const humidityData = [
    { day: 'Seg', humidity: 45 },
    { day: 'Ter', humidity: 52 },
    { day: 'Qua', humidity: 48 },
    { day: 'Qui', humidity: 61 },
    { day: 'Sex', humidity: 55 },
    { day: 'Sáb', humidity: 58 },
    { day: 'Dom', humidity: 62 },
  ];

  const systemStats = {
    soilHumidity: 48,
    temperature: 24,
    nextIrrigation: '14:30',
    waterUsage: 2.3,
    energyUsage: 0.12,
    plantsCount: 6
  };

  const handleIrrigateNow = async () => {
    setIsIrrigating(true);
    // Simulate irrigation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsIrrigating(false);
  };

  const getHumidityStatus = (humidity: number) => {
    if (humidity < 40) return { status: 'Seco', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertTriangle };
    if (humidity > 70) return { status: 'Molhado', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Droplets };
    return { status: 'Ideal', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle };
  };

  const humidityStatus = getHumidityStatus(systemStats.soilHumidity);
  const StatusIcon = humidityStatus.icon;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Olá, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-green-100">
              Seu sistema está funcionando perfeitamente. Última atualização: {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-green-100 text-sm">Sistema Online</div>
            <div className="flex items-center justify-end mt-1">
              <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Ativo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Soil Humidity */}
        <div className={`${humidityStatus.bgColor} rounded-xl p-6 border border-gray-200`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${humidityStatus.bgColor}`}>
              <StatusIcon className={`h-6 w-6 ${humidityStatus.color}`} />
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${humidityStatus.bgColor} ${humidityStatus.color}`}>
              {humidityStatus.status}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {systemStats.soilHumidity}%
          </div>
          <div className="text-gray-600 text-sm">Umidade do Solo</div>
        </div>

        {/* Temperature */}
        <div className="bg-orange-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Thermometer className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              Normal
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {systemStats.temperature}°C
          </div>
          <div className="text-gray-600 text-sm">Temperatura</div>
        </div>

        {/* Next Irrigation */}
        <div className="bg-blue-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              Agendado
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {systemStats.nextIrrigation}
          </div>
          <div className="text-gray-600 text-sm">Próxima Irrigação</div>
        </div>

        {/* Plants Count */}
        <div className="bg-emerald-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Sprout className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
              Saudáveis
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {systemStats.plantsCount}
          </div>
          <div className="text-gray-600 text-sm">Plantas Ativas</div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manual Irrigation */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Irrigação Manual</h3>
          <p className="text-gray-600 mb-6 text-sm">
            Force uma irrigação imediata se necessário. O sistema irá irrigar por 30 segundos.
          </p>
          <button
            onClick={handleIrrigateNow}
            disabled={isIrrigating}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isIrrigating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Irrigando...
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Irrigar Agora
              </>
            )}
          </button>
        </div>

        {/* Water Usage */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consumo de Água</h3>
          <div className="flex items-center mb-4">
            <Droplets className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{systemStats.waterUsage}L</div>
              <div className="text-gray-600 text-sm">Hoje</div>
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium">
            ↓ 32% menos que ontem
          </div>
        </div>

        {/* Energy Usage */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consumo de Energia</h3>
          <div className="flex items-center mb-4">
            <Zap className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{systemStats.energyUsage} kWh</div>
              <div className="text-gray-600 text-sm">Hoje</div>
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium">
            ↓ 15% menos que ontem
          </div>
        </div>
      </div>

      {/* Humidity Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Histórico de Umidade (7 dias)</h3>
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            Tendência crescente
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={humidityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                stroke="#059669" 
                strokeWidth={3}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;