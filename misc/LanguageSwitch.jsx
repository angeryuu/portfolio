import { useTheme } from '@/context/ThemeContext';

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="link uppercase cursor-pointer"
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
