import React from 'react';
import { Home, GraduationCap, Users, TreePine } from 'lucide-react';

const TargetAudience: React.FC = () => {
  const audiences = [
    {
      icon: <Home className="h-8 w-8 text-blue-600" />,
      title: "Moradores Urbanos",
      description: "Pessoas que vivem em apartamentos ou casas com pouco espaço para cultivo",
      benefits: ["Cultivo em varandas", "Alimentos frescos", "Economia doméstica"],
      stats: "85% da população brasileira"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      title: "Escolas e Educadores",
      description: "Instituições de ensino interessadas em educação ambiental prática",
      benefits: ["Ensino STEM", "Sustentabilidade", "Projeto interdisciplinar"],
      stats: "180 mil escolas no Brasil"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Comunidades Vulneráveis",
      description: "Áreas com insegurança alimentar e necessidade de geração de renda",
      benefits: ["Segurança alimentar", "Renda extra", "Desenvolvimento social"],
      stats: "33+ milhões de pessoas"
    },
    {
      icon: <TreePine className="h-8 w-8 text-emerald-600" />,
      title: "ONGs e Hortas Comunitárias",
      description: "Organizações focadas em projetos ambientais e sociais",
      benefits: ["Projetos sustentáveis", "Impacto social", "Tecnologia acessível"],
      stats: "290 mil ONGs ativas"
    }
  ];

  const useCases = [
    {
      scenario: "Apartamento pequeno",
      solution: "Sistema vertical na varanda com 4-6 vasos",
      impact: "15-20 plantas, economia R$ 100/mês em verduras"
    },
    {
      scenario: "Escola pública",
      solution: "Horta educativa com múltiplos sistemas",
      impact: "300+ alunos envolvidos, refeições mais nutritivas"
    },
    {
      scenario: "Comunidade carente",
      solution: "Sistema comunitário com geração de renda",
      impact: "20 famílias, R$ 200-400/mês por família"
    },
    {
      scenario: "ONG ambiental",
      solution: "Múltiplos sistemas para demonstração",
      impact: "1000+ pessoas capacitadas anualmente"
    }
  ];

  return (
    <section id="target" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            👥 Para Quem Sonha com um Futuro Verde
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-green-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold text-gray-800">Não importa onde você está ou qual é seu objetivo</span> - 
            o Germinah se adapta às suas necessidades! Seja você um iniciante curioso ou um educador visionário, 
            temos a solução perfeita para você.
          </p>
        </div>

        {/* Target Audiences */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {audiences.map((audience, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-6">
                <div className="mr-4">{audience.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{audience.title}</h3>
                  <p className="text-gray-600 mb-4">{audience.description}</p>
                  <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {audience.stats}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Principais Benefícios:</h4>
                <div className="flex flex-wrap gap-2">
                  {audience.benefits.map((benefit, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            💡 Histórias de Sucesso Reais
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 text-lg">{useCase.scenario}</h4>
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Solução:</span>
                    <p className="text-gray-700">{useCase.solution}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Impacto:</span>
                    <p className="text-gray-700">{useCase.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;