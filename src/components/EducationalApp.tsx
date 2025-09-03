import React, { useState } from 'react';
import { Smartphone, Play, BarChart3, Users, BookOpen, Gauge } from 'lucide-react';

const EducationalApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: <Gauge className="h-6 w-6 text-blue-500" />,
      title: "Monitoramento em Tempo Real",
      description: "Acompanhe dados de umidade e temperatura instantaneamente"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      title: "Instruções Passo a Passo",
      description: "Guias detalhados para montagem e manutenção do sistema"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      title: "Relatórios de Consumo",
      description: "Análise detalhada do uso de água e energia"
    },
    {
      icon: <Users className="h-6 w-6 text-orange-500" />,
      title: "Comunidade Educativa",
      description: "Compartilhe experiências com outros usuários"
    }
  ];

  const mockData = {
    humidity: 68,
    temperature: 24,
    waterUsage: 2.3,
    energyUsage: 0.15
  };

  return (
    <section id="app" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            📱 Seu Jardim na Palma da Mão
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold text-gray-800">Controle total do seu sistema, onde quer que esteja!</span> 
            Monitore, aprenda e otimize seu cultivo com dados em tempo real e insights inteligentes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* App Mockup */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Phone Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Germinah App</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* App Content */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{mockData.humidity}%</div>
                      <div className="text-xs text-gray-600">Umidade do Solo</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{mockData.temperature}°C</div>
                      <div className="text-xs text-gray-600">Temperatura</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Consumo de Água</span>
                      <span className="text-sm font-semibold text-blue-600">{mockData.waterUsage}L</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>

                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center">
                    <Play className="h-4 w-4 mr-2" />
                    Iniciar Irrigação
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-lg">
              <Smartphone className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* App Features */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Recursos Que Fazem a Diferença</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-white rounded-lg p-3 shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Público-Alvo do Aplicativo</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍🎓</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Estudantes</h4>
              <p className="text-gray-600 text-sm">Aprendizado prático sobre sustentabilidade e tecnologia</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Professores</h4>
              <p className="text-gray-600 text-sm">Ferramenta educacional para aulas de ciências e meio ambiente</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Entusiastas</h4>
              <p className="text-gray-600 text-sm">Pessoas interessadas em cultivo sustentável e inovação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalApp;