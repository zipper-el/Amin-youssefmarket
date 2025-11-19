
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 ${className}`}>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          language === 'en'
            ? 'bg-brand-yellow text-brand-blue shadow-sm'
            : 'text-white hover:bg-white/10'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          language === 'fr'
            ? 'bg-brand-yellow text-brand-blue shadow-sm'
            : 'text-white hover:bg-white/10'
        }`}
      >
        FR
      </button>
    </div>
  );
};
