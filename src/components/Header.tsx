import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'how-it-works', label: 'Como Funciona' },
    { id: 'app', label: 'App Educativo' },
    { id: 'impact', label: 'Impacto' },
    { id: 'contact', label: 'Contato' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Germinah
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-green-600 ${
                  activeSection === item.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Login Button */}
            <button
              onClick={goToLogin}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              Entrar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="py-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-300 hover:bg-green-50 hover:text-green-600 ${
                    activeSection === item.id ? 'text-green-600 bg-green-50' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Login Button */}
              <button
                onClick={goToLogin}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 mx-4 mt-2 rounded-lg"
              >
                Entrar
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;