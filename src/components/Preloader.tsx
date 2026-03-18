import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader = ({ isLoading }: PreloaderProps) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial Animation
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.5, ease: 'power2.inOut' },
      '-=0.5'
    );

    if (!isLoading) {
      // Out Animation
      gsap.to(containerRef.current, {
        y: '-100%',
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.2,
      });
    }
  }, [isLoading]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative">
        <div 
          ref={textRef}
        >
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">
              {t('hero.name')}
            </p>
            <h2 className="text-3xl font-black text-white mt-2 tracking-tighter">
              {t('hero.badge')}
            </h2>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>
      </div>

      {/* Background Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};

export default Preloader;
