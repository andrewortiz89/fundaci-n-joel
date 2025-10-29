
/// src/components/LanguageSelector/LanguageSelector.jsx
import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext'; // Ruta corregida
import './LanguageSelector.scss';

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  
  const languages = [
    { code: 'es', name: 'ES', fullName: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'EN', fullName: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'PT', fullName: 'Português', flag: '🇧🇷' },
  ];

  return (
    <div className="language-selector">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`lang-button ${language === lang.code ? 'active' : ''}`}
          title={lang.fullName}
        >
          <span className="lang-flag">{lang.flag}</span>
          <span className="lang-name">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;