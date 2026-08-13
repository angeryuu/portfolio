import { useEffect, useState } from "react";
import './SwitchThemeIcon.css';
import { useTheme } from '@/context/ThemeContext';

export default function SwitchThemeIcon() {
  const [isEnabled, setIsEnabled] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const toggleState = () => {
    toggleTheme()
    setIsEnabled((prevState) => !prevState);
  };

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div className={`toggle ${isEnabled ? "enabled" : "disabled"}`}>
        <span className="hidden">
          {isEnabled ? "Enable" : "Disable"}
        </span>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={isEnabled}
          onClick={toggleState}
        />
      </div>
    </label>
  );
}