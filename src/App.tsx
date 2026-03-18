import { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import ProjectList from './components/ProjectList'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import type { Project } from './types';
import './index.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      fetch(`${API_URL}/api/projects`)
        .then(res => res.json())
        .then(data => {
          setProjects(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("❌ Error fetching projects:", err);
          setIsLoading(false);
        });
    };

    // Initial fetch
    fetchProjects();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchProjects, 30000);
    return () => clearInterval(interval);
  }, []);

  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
        <Preloader isLoading={isLoading} />
        <CustomCursor />
      
      {!isLoading && (
        <>
          <Navbar />

          <main>
            <div id="home">
              <Hero />
            </div>
            <About projectCount={projects.length} />
            <Skills />
            <ProjectList initialProjects={projects} />
            <Contact />
          </main>

          <footer className="py-10 text-center border-t border-white/5 text-slate-500 text-sm">
            <p>© 2026 PENG SUE LEE MR. {t('footer.rights')}</p>
          </footer>
        </>
      )}
      </div>
  )
}

export default App
