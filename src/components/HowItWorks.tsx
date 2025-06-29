import React from 'react';
import { Droplets, Zap, DollarSign, Wrench } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Estrutura Vertical",
      description: "Garrafas PET dispostas verticalmente como vasos sustentáveis",
      icon: "🌿"
    },
    {
      number: "02", 
      title: "Sensores Inteligentes",
      description: "Monitoramento contínuo da umidade do solo em tempo real",
      icon: "📡"
    },
    {
      number: "03",
      title: "Automação Arduino",
      description: "Microcontrolador ativa bomba apenas quando necessário",
      icon: "🤖"
    },
    {
      number: "04",
      title: "Irrigação Eficiente",
      description: "Sistema por gravidade com reaproveitamento de água",
      icon: "💧"
    }
  ];

  const highlights = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-500" />,
      title: "Economia de Água",
      description: "Até 70% menos consumo comparado à irrigação tradicional"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Energia Mínima", 
      description: "Consumo energético baixíssimo com Arduino"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Baixo Custo",
      description: "Entre R$ 80 e R$ 150 para montar o sistema completo"
    },
    {
      icon: <Wrench className="h-8 w-8 text-purple-500" />,
      title: "Fácil Montagem",
      description: "Instruções simples para replicação em qualquer lugar"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona o Sistema
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um processo inteligente e automatizado que combina sustentabilidade com tecnologia acessível
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-sm font-bold text-green-600 mb-2">ETAPA {step.number}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"></div>
                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-emerald-400 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* System Diagram */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Diagrama do Sistema</h3>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🥤</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Garrafas PET</h4>
                  <p className="text-sm text-gray-600">Vasos sustentáveis dispostos verticalmente</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Arduino + Sensores</h4>
                  <p className="text-sm text-gray-600">Controle inteligente da irrigação</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💧</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sistema de Irrigação</h4>
                  <p className="text-sm text-gray-600">Distribuição por gravidade e reuso</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Principais Benefícios</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">{highlight.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{highlight.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;