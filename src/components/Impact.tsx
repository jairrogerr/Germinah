import React from 'react';
import { Target, Heart, Leaf, Home, Waves, Building } from 'lucide-react';

const Impact: React.FC = () => {
  const sdgs = [
    { number: 1, title: "Erradicação da Pobreza", icon: <Target className="h-6 w-6" />, color: "bg-red-500" },
    { number: 2, title: "Fome Zero", icon: <Heart className="h-6 w-6" />, color: "bg-yellow-500" },
    { number: 3, title: "Saúde e Bem-Estar", icon: <Heart className="h-6 w-6" />, color: "bg-green-500" },
    { number: 6, title: "Água Limpa", icon: <Waves className="h-6 w-6" />, color: "bg-blue-500" },
    { number: 11, title: "Cidades Sustentáveis", icon: <Building className="h-6 w-6" />, color: "bg-orange-500" },
    { number: 13, title: "Ação Climática", icon: <Leaf className="h-6 w-6" />, color: "bg-emerald-500" }
  ];

  const benefits = [
    {
      icon: <Home className="h-8 w-8 text-green-600" />,
      title: "Acesso a Alimentos Frescos",
      description: "Cultivo doméstico de vegetais nutritivos em pequenos espaços urbanos",
      metric: "100% orgânico"
    },
    {
      icon: <Waves className="h-8 w-8 text-blue-600" />,
      title: "Redução do Desperdício",
      description: "Irrigação inteligente que economiza até 70% da água utilizada",
      metric: "70% economia"
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Geração de Renda",
      description: "Oportunidades de venda local e desenvolvimento de microeconomia",
      metric: "R$ 200-500/mês"
    },
    {
      icon: <Leaf className="h-8 w-8 text-emerald-600" />,
      title: "Educação Ambiental",
      description: "Conscientização sobre sustentabilidade e tecnologia verde",
      metric: "∞ aprendizado"
    }
  ];

  const impactStats = [
    { value: "50%", label: "Redução no desperdício de água", color: "text-blue-600" },
    { value: "33M+", label: "Brasileiros que podem se beneficiar", color: "text-green-600" },
    { value: "R$ 150", label: "Custo máximo do sistema completo", color: "text-purple-600" },
    { value: "24/7", label: "Monitoramento automatizado", color: "text-orange-600" }
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            🌍 Juntos Mudando o Mundo
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold text-gray-800">Cada sistema Germinah instalado é um passo em direção a um futuro mais sustentável!</span> 
            Nosso impacto vai além da tecnologia - estamos construindo uma comunidade de agentes de mudança.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* UN SDGs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            🎯 Alinhados com os ODS da ONU
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgs.map((sdg, index) => (
              <div key={index} className="bg-white rounded-xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className={`${sdg.color} text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 text-sm font-bold`}>
                    {sdg.number}
                  </div>
                  <div className="text-gray-400">{sdg.icon}</div>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{sdg.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">💎 Benefícios Que Transformam Vidas</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start">
                  <div className="mr-6 mt-1">{benefit.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                    <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {benefit.metric}
                    </div>
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

export default Impact;