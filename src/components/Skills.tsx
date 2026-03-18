import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React / Next.js", level: 30, color: "from-blue-500 to-indigo-600" },
  { name: "TypeScript", level: 30, color: "from-indigo-500 to-purple-600" },
  { name: "Node.js (Express)", level: 30, color: "from-purple-500 to-pink-600" },
  { name: "Python (Django)", level: 30, color: "from-pink-500 to-rose-600" },
  { name: "Tailwind CSS", level: 30, color: "from-cyan-500 to-blue-600" },
  { name: "SQL / NoSQL", level: 30, color: "from-amber-500 to-orange-600" },
];

const Skills = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation ສຳລັບແຖບ Skill (Progress Bars)
    gsap.from('.skill-bar', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      ease: 'power3.inOut',
      stagger: 0.1,
    });

    // Animation ສຳລັບຂໍ້ຄວາມ
    gsap.from('.skill-item', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="py-32 px-6 bg-slate-900/30 backdrop-blur-sm border-y border-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-fade-in">
           <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-6 tracking-widest uppercase border border-purple-500/10">
              {t('expertise')}
           </div>
           <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
             {t('skills.title')}
           </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="flex justify-between items-end mb-4">
                <span className="text-lg font-bold text-white tracking-tight">{skill.name}</span>
                <span className="text-blue-400 font-mono text-sm">{skill.level}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 p-0.5">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full skill-bar w-0`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
