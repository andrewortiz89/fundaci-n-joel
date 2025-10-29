// src/contexts/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // 1. Intentar cargar idioma guardado
    const saved = localStorage.getItem('foundation-language');
    if (saved && translations[saved]) return saved;
    
    // 2. Detectar idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) return browserLang;
    
    // 3. Default a español
    return 'es';
  });

  // Guardar preferencia cuando cambie
  useEffect(() => {
    localStorage.setItem('foundation-language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation debe usarse dentro de LanguageProvider');
  }
  return context;
}
