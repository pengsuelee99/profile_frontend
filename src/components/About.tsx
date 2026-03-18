import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  projectCount: number;
}

const About = ({ projectCount }: AboutProps) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation ສຳລັບຮູບພາບ
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Animation ສຳລັບເນື້ອຫາຂໍ້ຄວາມ
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="py-32 px-6 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={imageRef} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-slate-900 rounded-3xl aspect-[4/5] overflow-hidden border border-slate-800 shadow-2xl">
            <img 
              src="/profile.jpg" 
              alt="PENG SUE LEE MR" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Decor */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8">
               <p className="text-white font-bold text-xl mb-1 tracking-tight">PENG SUE LEE MR.</p>
               <p className="text-blue-400 text-sm font-medium">Software Developer & Designer</p>
            </div>
          </div>
        </div>
        
        <div ref={textRef}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 tracking-widest uppercase border border-blue-500/10">
            About Me
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t('about.title')}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            {t('about.description')}
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{t('about.exp_label')}</p>
              <p className="text-xl font-bold text-blue-400">{t('about.exp_value')}</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{t('about.projects_label')}</p>
              <p className="text-xl font-bold text-purple-400">{projectCount}+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
