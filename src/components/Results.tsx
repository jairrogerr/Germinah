import React from 'react';
import { CheckCircle, TrendingUp, Award, Zap } from 'lucide-react';

const Results: React.FC = () => {
  const achievements = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Protótipo Funcional",
      description: "Sistema físico testado com sucesso em ambiente controlado",
      status: "Concluído"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Irrigação Inteligente",
      description: "Ativação automática apenas quando necessário, comprovada em testes",
      status: "Validado"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Economia Comprovada",
      description: "Redução significativa no consumo de água e energia elétrica",
      status: "Medido"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Potencial de Escala",
      description: "Viabilidade técnica e econômica para replicação em larga escala",
      status: "Avaliado"
    }
  ];

  const testResults = [
    {
      metric: "Economia de Água",
      value: "68%",
      comparison: "vs. irrigação manual",
      trend: "up",
      color: "text-blue-600"
    },
    {
      metric: "Consumo Energético",
      value: "< 5W",
      comparison: "por hora de operação",
      trend: "down",
      color: "text-green-600"
    },
    {
      metric: "Taxa de Sobrevivência",
      value: "95%",
      comparison: "das plantas cultivadas",
      trend: "up",
      color: "text-emerald-600"
    },
    {
      metric: "Custo Total",
      value: "R$ 127",
      comparison: "sistema completo",
      trend: "down",
      color: "text-purple-600"
    }
  ];

  const timeline = [
    {
      phase: "Pesquisa e Desenvolvimento",
      period: "Março - Maio 2024",
      description: "Estudo de viabilidade e desenvolvimento do conceito inicial",
      status: "completed"
    },
    {
      phase: "Prototipagem",
      period: "Junho - Agosto 2024",
      description: "Construção e testes do primeiro protótipo funcional",
      status: "completed"
    },
    {
      phase: "Validação e Testes",
      period: "Setembro - Novembro 2024",
      description: "Testes extensivos e coleta de dados de performance",
      status: "completed"
    },
    {
      phase: "Otimização e Escala",
      period: "Dezembro 2024 - ...",
      description: "Melhorias no sistema e preparação para produção em escala",
      status: "in-progress"
    }
  ];

  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            📊 Resultados Que Inspiram!
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold text-gray-800">Os números falam por si!</span> 
            Cada teste realizado confirma que o Germinah não é apenas uma ideia - é uma solução real, 
            testada e pronta para transformar a forma como cultivamos alimentos.
          </p>
        </div>

        {/* Test Results Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testResults.map((result, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className={`text-3xl font-bold ${result.color} mb-2`}>
                  {result.value}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{result.metric}</h4>
                <p className="text-gray-600 text-sm">{result.comparison}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">🏆 Marcos de Uma Jornada Vitoriosa</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{achievement.title}</h4>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        {achievement.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Timeline */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Cronograma do Projeto</h3>
          <div className="space-y-6">
            {timeline.map((phase, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-6">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    phase.status === 'completed' 
                      ? 'bg-green-500 border-green-500' 
                      : phase.status === 'in-progress'
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-gray-300 border-gray-300'
                  }`}></div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-300 ml-1.5 mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{phase.phase}</h4>
                    <span className="text-sm text-gray-500 mt-1 sm:mt-0">{phase.period}</span>
                  </div>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Prospects */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Próximos Passos</h3>
            <p className="text-green-100 text-lg max-w-3xl mx-auto mb-6">
              Com os resultados positivos obtidos, estamos prontos para expandir o projeto 
              e levar o Germinah para mais comunidades, escolas e lares brasileiros.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-200 mb-1">100+</div>
                <div className="text-green-100 text-sm">Sistemas planejados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-200 mb-1">50+</div>
                <div className="text-green-100 text-sm">Parcerias em negociação</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-200 mb-1">1000+</div>
                <div className="text-green-100 text-sm">Pessoas impactadas (meta)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;