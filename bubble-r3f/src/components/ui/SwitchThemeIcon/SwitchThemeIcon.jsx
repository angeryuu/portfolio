import { useEffect, useState } from "react";
import './SwitchThemeIcon.css';
import { useTheme } from '@/context/ThemeContext';
import  SunIcon  from '@/components/ui/icons/SunIcon.jsx' 
import  MoonIcon  from '@/components/ui/icons/MoonIcon.jsx' 

export default function SwitchThemeIcon() {
  const { theme, toggleTheme } = useTheme();

  const toggleState = () => {
    toggleTheme()
    setIsEnabled((prevState) => !prevState);
  };

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div className={`toggle ${theme === 'dark' ? "enabled" : "disabled"}`}>
        <span className="hidden">
          {theme === 'dark' ? "Enable" : "Disable"}
        </span>
        <div className="icons fill-base">
          <SunIcon />
          <MoonIcon />
        </div>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={theme === 'dark'}
          onClick={toggleState}
        />
      </div>
    </label>
  );
}