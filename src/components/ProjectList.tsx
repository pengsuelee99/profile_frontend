import { useState, useEffect } from 'react';
import type { Project } from '../types';
import ProjectModal from './ProjectModal';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

interface ProjectListProps {
  initialProjects: Project[];
}

const ProjectList = ({ initialProjects }: ProjectListProps) => {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  return (
    <section id="projects" className="py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('projects.title')}</h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
                className="bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all group cursor-pointer backdrop-blur-sm"
              >
                {/* Project Card Image */}
              <div className="h-56 bg-slate-950 relative overflow-hidden group-hover:bg-blue-600/5 transition-colors">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="p-10 border-2 border-dashed border-slate-800 rounded-2xl group-hover:border-blue-500/30 transition-all transform group-hover:scale-110">
                     <svg className="w-12 h-12 text-slate-700 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-4m0 0l4 4m-4-4V4" />
                     </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {language === 'la' ? project.title_la : language === 'th' ? project.title_th : project.title_en}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Coming Soon' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                      project.status === 'Developing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                      'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {project.status === 'Coming Soon' ? t('status.coming_soon') : 
                       project.status === 'Developing' ? t('status.developing') : 
                       t('status.completed')}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2 font-light">
                    {language === 'la' ? project.description_la : language === 'th' ? project.description_th : project.description_en}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-lg border border-slate-700 group-hover:border-blue-500/20 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-blue-400 text-sm font-bold gap-2 group-hover:gap-3 transition-all">
                     {t('projects.view_details')}
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                     </svg>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500">
              <p>{t('projects.no_data')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal ເພື່ອໂຊລາຍລະອຽດແບບ Zoom */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default ProjectList;
