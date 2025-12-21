import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import EducationalApp from './components/EducationalApp';
import Impact from './components/Impact';
import TargetAudience from './components/TargetAudience';
import Results from './components/Results';
import Contact from './components/Contact';
import Footer from './components/Footer';

// App Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Help from './pages/Help';
import AppLayout from './components/AppLayout';

// Supabase
import { auth } from './lib/supabase';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on app load
    const checkAuth = async () => {
      try {
        const { user, error } = await auth.getCurrentUser();
        if (user && !error) {
          const userData = {
            id: user.id,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'Usuário',
            email: user.email || ''
          };
          localStorage.setItem('germinah_user', JSON.stringify(userData));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const userData = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Usuário',
          email: session.user.email || ''
        };
        localStorage.setItem('germinah_user', JSON.stringify(userData));
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('germinah_user');
        localStorage.removeItem('germinah_settings');
        setIsAuthenticated(false);
      }
    }).data?.subscription;

    return () => {
      unsubscribe?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentPath === '/') {
      const handleScroll = () => {
        const sections = ['home', 'about', 'how-it-works', 'app', 'impact', 'target', 'results', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentPath]);

  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <EducationalApp />
        <Impact />
        <TargetAudience />
        <Results />
        <Contact />
      </main>
      <Footer />
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <PWAUpdatePrompt />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/registro" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/painel" element={
          isAuthenticated ? (
            <AppLayout>
              <Dashboard />
            </AppLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/plantas" element={
          isAuthenticated ? (
            <AppLayout>
              <Plants />
            </AppLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/configuracoes" element={
          isAuthenticated ? (
            <AppLayout>
              <Settings />
            </AppLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/conta" element={
          isAuthenticated ? (
            <AppLayout>
              <Account setIsAuthenticated={setIsAuthenticated} />
            </AppLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/ajuda" element={
          isAuthenticated ? (
            <AppLayout>
              <Help />
            </AppLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
      <PWAInstallPrompt />
    </Router>
  );
}

export default App;