import React from 'react';
import { ArrowDown, ArrowRight, Droplets, Cpu, Recycle } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Germinah:</span>
            <span className="block bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              Plantando o Futuro
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
              com Inovação
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Automação, sustentabilidade e educação ambiental em um só projeto.
            <br />
            <span className="text-green-200 font-medium">
              Sistema de irrigação vertical inteligente e acessível.
            </span>
          </p>
        </div>

        {/* Feature Icons */}
        {/*<div className="flex justify-center space-x-8 mb-12">
          <div className="flex flex-col items-center group">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:bg-white/30 transition-all duration-300">
              <Droplets className="h-8 w-8 text-blue-300" />
            </div>
            <span className="text-sm text-green-100 mt-2">Economia de Água</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:bg-white/30 transition-all duration-300">
              <Cpu className="h-8 w-8 text-green-300" />
            </div>
            <span className="text-sm text-green-100 mt-2">Automação</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:bg-white/30 transition-all duration-300">
              <Recycle className="h-8 w-8 text-emerald-300" />
            </div>
            <span className="text-sm text-green-100 mt-2">Sustentável</span>
          </div>
        </div>*/}

        {/* CTA Button */}
        <button
          onClick={scrollToAbout}
          className="group inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-full text-lg transition-all duration-300 hover:bg-green-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
        >
          Acessar o app
          <ArrowRight className="ml-2 h-5 w-5 group-hover:animate-bounce" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;