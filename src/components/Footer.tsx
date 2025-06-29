import React from 'react';
import { Leaf, Mail, Instagram, Youtube, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Projeto",
      links: [
        { name: "Sobre o Germinah", href: "#about" },
        { name: "Como Funciona", href: "#how-it-works" },
        { name: "Aplicativo", href: "#app" },
        { name: "Resultados", href: "#results" }
      ]
    },
    {
      title: "Impacto",
      links: [
        { name: "Social e Ambiental", href: "#impact" },
        { name: "Público-Alvo", href: "#target" },
        { name: "ODS da ONU", href: "#impact" },
        { name: "Sustentabilidade", href: "#about" }
      ]
    },
    {
      title: "Participação",
      links: [
        { name: "Para Escolas", href: "#contact" },
        { name: "Para ONGs", href: "#contact" },
        { name: "Parcerias", href: "#contact" },
        { name: "Voluntariado", href: "#contact" }
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Germinah</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Plantando o futuro com inovação. Sistema de irrigação vertical 
              automatizado, sustentável e acessível para todos.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contato@germinah.com.br"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/germinah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/germinah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Projeto Germinah. Todos os direitos reservados.
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>para um futuro mais sustentável</span>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 p-6 bg-gray-800 rounded-xl">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">Zero</div>
                <div className="text-gray-400 text-sm">Desperdício de Água</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
                <div className="text-gray-400 text-sm">Tecnologia Aberta</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">∞</div>
                <div className="text-gray-400 text-sm">Potencial de Impacto</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;