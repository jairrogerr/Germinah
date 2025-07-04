import React, { useState } from 'react';
import { 
  Save, 
  RotateCcw, 
  Droplets, 
  Clock, 
  Zap, 
  Bell,
  Smartphone,
  Mail,
  CheckCircle
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    irrigation: {
      autoMode: true,
      minHumidity: 40,
      maxHumidity: 70,
      checkInterval: 30,
      irrigationDuration: 30
    },
    notifications: {
      email: true,
      push: true,
      lowHumidity: true,
      systemErrors: true,
      weeklyReport: true
    },
    system: {
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      units: 'metric'
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage for demo
    localStorage.setItem('germinah_settings', JSON.stringify(settings));
    
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    setSettings({
      irrigation: {
        autoMode: true,
        minHumidity: 40,
        maxHumidity: 70,
        checkInterval: 30,
        irrigationDuration: 30
      },
      notifications: {
        email: true,
        push: true,
        lowHumidity: true,
        systemErrors: true,
        weeklyReport: true
      },
      system: {
        timezone: 'America/Sao_Paulo',
        language: 'pt-BR',
        units: 'metric'
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Personalize o comportamento do seu sistema</p>
        </div>
        
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={handleReset}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Restaurar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
          <span className="text-green-800">Configurações salvas com sucesso!</span>
        </div>
      )}

      {/* Irrigation Settings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Droplets className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Configurações de Irrigação</h2>
            <p className="text-gray-600 text-sm">Defina como o sistema deve irrigar suas plantas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={settings.irrigation.autoMode}
                onChange={(e) => handleSettingChange('irrigation', 'autoMode', e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-gray-700 font-medium">Irrigação Automática</span>
            </label>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Umidade Mínima (%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={settings.irrigation.minHumidity}
                  onChange={(e) => handleSettingChange('irrigation', 'minHumidity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>20%</span>
                  <span className="font-medium text-green-600">{settings.irrigation.minHumidity}%</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Umidade Máxima (%)
                </label>
                <input
                  type="range"
                  min="60"
                  max="90"
                  value={settings.irrigation.maxHumidity}
                  onChange={(e) => handleSettingChange('irrigation', 'maxHumidity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>60%</span>
                  <span className="font-medium text-blue-600">{settings.irrigation.maxHumidity}%</span>
                  <span>90%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intervalo de Verificação (minutos)
              </label>
              <select
                value={settings.irrigation.checkInterval}
                onChange={(e) => handleSettingChange('irrigation', 'checkInterval', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={60}>1 hora</option>
                <option value={120}>2 horas</option>
                <option value={240}>4 horas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duração da Irrigação (segundos)
              </label>
              <input
                type="number"
                min="10"
                max="120"
                value={settings.irrigation.irrigationDuration}
                onChange={(e) => handleSettingChange('irrigation', 'irrigationDuration', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="bg-purple-100 p-3 rounded-lg mr-4">
            <Bell className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Notificações</h2>
            <p className="text-gray-600 text-sm">Escolha como deseja ser notificado</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Canais de Notificação</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <Mail className="h-4 w-4 text-gray-400 ml-3 mr-2" />
                <span className="text-gray-700">Email</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <Smartphone className="h-4 w-4 text-gray-400 ml-3 mr-2" />
                <span className="text-gray-700">Push (Navegador)</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Tipos de Notificação</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.lowHumidity}
                  onChange={(e) => handleSettingChange('notifications', 'lowHumidity', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-gray-700">Umidade baixa</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.systemErrors}
                  onChange={(e) => handleSettingChange('notifications', 'systemErrors', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-gray-700">Erros do sistema</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.weeklyReport}
                  onChange={(e) => handleSettingChange('notifications', 'weeklyReport', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-gray-700">Relatório semanal</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="bg-gray-100 p-3 rounded-lg mr-4">
            <Zap className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Sistema</h2>
            <p className="text-gray-600 text-sm">Configurações gerais do sistema</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuso Horário
            </label>
            <select
              value={settings.system.timezone}
              onChange={(e) => handleSettingChange('system', 'timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
              <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
              <option value="America/Manaus">Manaus (GMT-4)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Idioma
            </label>
            <select
              value={settings.system.language}
              onChange={(e) => handleSettingChange('system', 'language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidades
            </label>
            <select
              value={settings.system.units}
              onChange={(e) => handleSettingChange('system', 'units', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="metric">Métrico (°C, L)</option>
              <option value="imperial">Imperial (°F, gal)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;