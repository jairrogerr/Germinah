import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
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

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('germinah_token');
    setIsAuthenticated(!!token);
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

  return (
    <Router>
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
    </Router>
  );
}

export default App;