import { createContext, useContext, useEffect, useState } from 'react';
import contentData from '@/data/content.json';

const ThemeContext = createContext();

const SUPPORTED_LANGUAGES = ['es', 'en'];

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      // Solo es 'light' si el usuario lo pidió explícitamente en el pasado
      if (savedTheme === 'light') {
        return 'light';
      }
    }
    // Para todos los demás casos (primera visita), es 'dark'
    return 'dark';
  });

  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
        return savedLanguage;
      }
      // Si no hay preferencia guardada, probamos el idioma del navegador
      const browserLang = navigator.language?.slice(0, 2);
      if (SUPPORTED_LANGUAGES.includes(browserLang)) {
        return browserLang;
      }
    }
    return 'es';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const content = contentData[language];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, setLanguage, toggleLanguage, content }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
