import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { language, t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (project) {
      // Zoom & Fade Entry
      gsap.fromTo(modalRef.current, 
        { scale: 0.8, opacity: 0, backdropFilter: 'blur(0px)' },
        { scale: 1, opacity: 1, backdropFilter: 'blur(12px)', duration: 0.6, ease: 'expo.out' }
      );

      // Floating Content Entry
      gsap.from('.modal-content-item', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      });

      // Floating Loop ສຳລັບ Icon
      gsap.to('.floating-icon', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 cursor-pointer"
        />

        {/* Modal Window */}
        <div 
          ref={modalRef}
          className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 bg-slate-800/50 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-full transition-all border border-slate-700 backdrop-blur-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Side: Media/Gallery */}
          <div className="w-full md:w-1/2 bg-slate-950 flex items-center justify-center relative group overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
             {project.image ? (
               <img 
                 src={project.image.startsWith('http') ? project.image : `${import.meta.env.BASE_URL}${project.image}`} 
                 alt={project.title} 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
               />
             ) : (
               <>
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/10 opacity-50" />
                 <div className="text-center p-8 modal-content-item">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30 floating-icon">
                       <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                    </div>
                    <p className="text-slate-500 text-sm">Gallery Image Space</p>
                 </div>
               </>
             )}
          </div>

          {/* Right Side: Content */}
          <div 
            ref={contentRef}
            className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar"
          >
            <div className="modal-content-item mb-2 flex items-center gap-2">
               <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{project.status}</span>
               <span className="w-1 h-1 bg-slate-700 rounded-full" />
               <span className="text-xs text-slate-500 font-medium">Project Review</span>
            </div>
            
            <h2 className="modal-content-item text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {language === 'la' ? project.title_la : language === 'th' ? project.title_th : project.title_en}
            </h2>

            <div className="modal-content-item flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-blue-500/5 text-blue-400/80 border border-blue-500/10 rounded-md text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="modal-content-item space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {t('projects.view_details')}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base font-light">
                  {language === 'la' ? project.description_la : language === 'th' ? project.description_th : project.description_en}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-center transition-all shadow-lg shadow-blue-500/20"
                >
                  Demo
                </a>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold border border-slate-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
