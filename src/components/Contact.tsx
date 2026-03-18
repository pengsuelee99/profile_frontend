import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-10 md:p-16 text-center shadow-2xl backdrop-blur-sm"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('contact.title')}
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          {t('contact.description')}
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder={t('contact.name')}
              required
            />
          </div>
          <div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder={t('contact.email')}
              required
            />
          </div>
          <div>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder={t('contact.message')}
              required
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            {status === 'sending' ? 'Sending...' : t('contact.send')}
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-green-400 font-bold"
              >
                {t('contact.success')}
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-red-400 font-bold"
              >
                Error! Please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
