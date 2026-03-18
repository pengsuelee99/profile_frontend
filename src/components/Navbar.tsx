import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-xl border-b border-white/5">
      <div className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text uppercase">
        {t('hero.name')}
      </div>
      
      <div className="hidden md:flex items-center gap-10">
        <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
          <a href="#home" className="hover:text-white transition-colors">{t('nav.home')}</a>
          <a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a>
          <a href="#skills" className="hover:text-white transition-colors">{t('nav.skills')}</a>
          <a href="#projects" className="hover:text-white transition-colors">{t('nav.projects')}</a>
          <a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-full border border-white/5">
          <button 
            onClick={() => setLanguage('la')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${language === 'la' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            LA
          </button>
          <button 
            onClick={() => setLanguage('th')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${language === 'th' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            TH
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            EN
          </button>
        </div>
      </div>

      <a 
        href="#contact"
        className="px-5 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-purple-600 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
      >
        {t('nav.hire')}
      </a>
    </nav>
  );
};

export default Navbar;
