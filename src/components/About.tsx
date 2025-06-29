import React from 'react';
import { Target, AlertTriangle, Users, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const problems = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      stat: "50%",
      description: "da água na agricultura é desperdiçada (FAO, 2022)"
    },
    {
      icon: <Users className="h-6 w-6 text-orange-500" />,
      stat: "33+ milhões",
      description: "de brasileiros com insegurança alimentar (PENSSAN, 2023)"
    }
  ];

  const applications = [
    { icon: "🏠", title: "Hortas Domésticas", description: "Cultivo em pequenos espaços urbanos" },
    { icon: "🏫", title: "Escolas", description: "Educação ambiental prática" },
    { icon: "🤝", title: "Comunidades", description: "Projetos sociais em áreas carentes" },
    { icon: "🌱", title: "ONGs", description: "Iniciativas sustentáveis e educativas" }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sobre o Projeto Germinah
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Um sistema de irrigação vertical automatizado e de baixo custo, desenvolvido com materiais 
            recicláveis, sensores de umidade e microcontrolador Arduino.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Como Funciona</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                O Germinah utiliza sensores de umidade para monitorar o solo em tempo real, 
                ativando automaticamente a irrigação apenas quando necessário. Isso garante 
                o uso racional da água e facilita o cultivo doméstico.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Irrigação baseada na umidade real do solo
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Materiais recicláveis como garrafas PET
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Tecnologia Arduino acessível e eficiente
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Problemas que Enfrentamos</h3>
            {problems.map((problem, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-400">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">{problem.icon}</div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{problem.stat}</div>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Aplicações do Sistema</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4 text-center">{app.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center">{app.title}</h4>
                <p className="text-gray-600 text-center text-sm">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;