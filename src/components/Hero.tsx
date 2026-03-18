
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { useRef } from 'react';

// ລົງທະບຽນ Plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Premium Staggered Entrance Animation
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-title-line', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out'
    }, '-=0.4')
    .from('.hero-description', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-btns', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.scroll-indicator', {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.4');

    // Parallax Effect ເວລາ Scroll
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      opacity: 0.5,
      scale: 0.9,
    });

    // Floating Animation ສຳລັບ Elements ຕ່າງໆ
    gsap.to('.floating-blob', {
      y: 'random(-50, 50)',
      x: 'random(-30, 30)',
      rotation: 'random(-15, 15)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950"
    >
      {/* Premium Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] floating-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] floating-blob" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-indigo-600/10 rounded-full blur-[80px] floating-blob" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero-badge inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-500/20">
            {t('hero.badge')}
          </span>
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            <div className="hero-title-line">{t('hero.greeting')}</div>
            <div className="hero-title-line text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              {t('hero.name')}
            </div>
          </h1>
          <p className="hero-description max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-btns w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
            >
              {t('hero.view_work')}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-btns w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              {t('hero.contact_me')}
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-blue-500 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

