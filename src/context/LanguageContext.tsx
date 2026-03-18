import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'la' | 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  la: {
    // Navbar
    'nav.home': 'ໜ້າທຳອິດ',
    'nav.about': 'ກ່ຽວກັບ',
    'nav.skills': 'ທັກສະ',
    'nav.projects': 'ຜົນງານ',
    'nav.contact': 'ຕິດຕໍ່',
    'nav.hire': 'ຈ້າງຂ້ອຍ',
    // Hero
    'hero.badge': 'ມີຄວາມພ້ອມໃນການສ້າງສັນຜົນງານໃໝ່ໆ',
    'hero.greeting': 'ສະບາຍດີ ຂ້ອຍຊື່',
    'hero.name': 'PENG SUE LEE MR.',
    'hero.description': 'ນັກພັດທະນາ Full-stack ທີ່ມັກໃນການທ້າທາຍສິ່ງໃໝ່ໆ ແລະ ສ້າງສັນປະສົບການທີ່ດີໃນການໃຊ້ງານເວັບໄຊທ໌.',
    'hero.view_work': 'ເບິ່ງຜົນງານຂອງຂ້ອຍ',
    'hero.contact_me': 'ຕິດຕໍ່ຂ້ອຍ',
    // About
    'about.title': 'ກ່ຽວກັບຂ້ອຍ',
    'about.description': 'ຂ້ອຍເປັນນັກພັດທະນາເວັບໄຊທ໌ທີ່ມີຄວາມມຸ່ງໝັ້ນໃນການຮຽນຮູ້ເຕັກໂນໂລຢີໃໝ່ໆຢ່າງຕໍ່ເນື່ອງ. ຂ້ອຍມີຄວາມຊ່ຽວຊານໃນການສ້າງເວັບໄຊທ໌ທີ່ທັນສະໄໝ, ຕອບໂຈດ ແລະ ໃຊ້ງານງ່າຍ.',
    'about.exp_label': 'ລະດັບປະສົບການ',
    'about.exp_value': 'ເລີ່ມຕົ້ນ',
    'about.projects_label': 'ໂປຣເຈັກທີ່ສຳເລັດສົມບູນ',
    // Skills
    'skills.title': 'ທັກສະ ແລະ ຄວາມຊຳນານ',
    // Projects
    'projects.title': 'ຜົນງານທີ່ຜ່ານມາ',
    'projects.view_details': 'ເບິ່ງລາຍລະອຽດ',
    'projects.no_data': 'ບໍ່ພົບຂໍ້ມູນຜົນງານໃນຖານຂໍ້ມູນ...',
    'status.coming_soon': 'ໄວໆນີ້',
    'status.developing': 'ກຳລັງພັດທະນາ',
    'status.completed': 'ສຳເລັດແລ້ວ',
    // Contact
    'contact.title': 'ຕິດຕໍ່ພົວພັນ',
    'contact.description': 'ມີໂປຣເຈັກທີ່ຢາກປຶກສາ ຫຼື ຢາກຮ່ວມງານນຳກັນບໍ? ສາມາດສົ່ງຂໍ້ຄວາມຫາຂ້ອຍໄດ້ເລີຍ!',
    'contact.name': 'ຊື່ຂອງເຈົ້າ',
    'contact.email': 'ອີເມວຂອງເຈົ້າ',
    'contact.message': 'ຂໍ້ຄວາມ',
    'contact.send': 'ສົ່ງຂໍ້ຄວາມ',
    'contact.success': 'ສົ່ງຂໍ້ຄວາມສຳເລັດແລ້ວ! ຂອບໃຈທີ່ຕິດຕໍ່ມາ.',
    // Footer
    'footer.rights': 'ສະຫງວນລິຂະສິດ.',
  },
  th: {
    // Navbar
    'nav.home': 'หน้าแรก',
    'nav.about': 'เกี่ยวกับ',
    'nav.skills': 'ทักษะ',
    'nav.projects': 'ผลงาน',
    'nav.contact': 'ติดต่อ',
    'nav.hire': 'จ้างฉัน',
    // Hero
    'hero.badge': 'พร้อมสำหรับการสร้างสรรค์ผลงานใหม่ๆ',
    'hero.greeting': 'สวัสดี ฉันชื่อ',
    'hero.name': 'PENG SUE LEE MR.',
    'hero.description': 'นักพัฒนา Full-stack ที่รักในการท้าทายสิ่งใหม่ๆ และสร้างสรรค์ประสบการณ์ที่ดีในการใช้งานเว็บไซต์.',
    'hero.view_work': 'ดูผลงานของฉัน',
    'hero.contact_me': 'ติดต่อฉัน',
    // About
    'about.title': 'เกี่ยวกับฉัน',
    'about.description': 'ฉันเป็นนักพัฒนาเว็บไซต์ที่มีความมุ่งมั่นในการเรียนรู้เทคโนโลยีใหม่ๆ อย่างต่อเนื่อง มีความเชี่ยวชาญในการสร้างเว็บไซต์ที่ทันสมัย และใช้งานง่าย.',
    'about.exp_label': 'ระดับประสบการณ์',
    'about.exp_value': 'เริ่มต้น',
    'about.projects_label': 'โปรเจกต์ที่เสร็จสมบูรณ์',
    // Skills
    'skills.title': 'ทักษะและความชำนาญ',
    // Projects
    'projects.title': 'ผลงานที่ผ่านมา',
    'projects.view_details': 'ดูรายละเอียด',
    'projects.no_data': 'ไม่พบข้อมูลผลงานในฐานข้อมูล...',
    'status.coming_soon': 'เร็วๆ นี้',
    'status.developing': 'กำลังพัฒนา',
    'status.completed': 'เสร็จสมบูรณ์',
    // Contact
    'contact.title': 'ติดต่อฉัน',
    'contact.description': 'มีโปรเจกต์ที่อยากปรึกษา หรืออยากร่วมงานกันไหม? ส่งข้อความหาฉันได้เลย!',
    'contact.name': 'ชื่อของคุณ',
    'contact.email': 'อีเมลของคุณ',
    'contact.message': 'ข้อความ',
    'contact.send': 'ส่งข้อความ',
    'contact.success': 'ส่งข้อความสำเร็จแล้ว! ขอบคุณที่ติดต่อมา.',
    // Footer
    'footer.rights': 'สงวนลิขสิทธิ์.',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.hire': 'Hire Me',
    // Hero
    'hero.badge': 'Ready to Create Something New',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'PENG SUE LEE MR.',
    'hero.description': 'A Full-stack Developer who loves challenges and creating great user experiences on the web.',
    'hero.view_work': 'View My Work',
    'hero.contact_me': 'Contact Me',
    // About
    'about.title': 'About Me',
    'about.description': 'I am a passionate web developer committed to continuous learning. I specialize in building modern, responsive, and user-friendly websites.',
    'about.exp_label': 'Experience Level',
    'about.exp_value': 'Beginner',
    'about.projects_label': 'Projects Completed',
    // Skills
    'skills.title': 'Skills & Expertise',
    // Projects
    'projects.title': 'Recent Projects',
    'projects.view_details': 'View Details',
    'projects.no_data': 'No project data found...',
    'status.coming_soon': 'Coming Soon',
    'status.developing': 'Developing',
    'status.completed': 'Completed',
    // Contact
    'contact.title': 'Get In Touch',
    'contact.description': 'Have a project in mind or want to collaborate? Feel free to send me a message!',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully! Thank you for reaching out.',
    // Footer
    'footer.rights': 'All rights reserved.',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved as Language) || 'la';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
