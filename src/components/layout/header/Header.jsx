import { useState } from 'react';
import { useBubbleStore } from '@/stores/bubbleStore'
import { useTheme } from '@/context/ThemeContext';
import SwitchThemeIcon from '@/components/ui/SwitchThemeIcon/SwitchThemeIcon';
import {ExternalLinkIcon} from '@/components/ui/icons/ExternalLinkIcon';
import './Header.css';
import { useScrolled } from '@/components/hooks/useScrolled';

export function Header(){

    const setTargetIndex = useBubbleStore((state) => state.setTargetIndex)
    const { content, toggleLanguage } = useTheme();
    const scrolled = useScrolled();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
            <header className='header'>
                <button
                    className={`burger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Abrir menú"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
                    
                    {content.nav.map((item, index) => { 
                        return <li key={index} 
                                    onMouseEnter={() => setTargetIndex((index+1)%4)} 
                                    onMouseLeave={() => setTargetIndex(0)} 
                                    className={`link ${index === 0 ? '' : ''}`}>
                                        <a {...(item.name === "CV" ? { download: true } : {})}
                                           href={item.url}
                                           className="flex items-baseline group"
                                           onClick={closeMenu}>
                                            {item.name}
                                            {item.name === "CV" && <ExternalLinkIcon className="fill-gray w-3.5 ml-2 group-hover:fill-pink-500" />}
                                        </a>
                                        
                                </li>
                        })}
                </nav>
                <div className={`lang-and-theme ${scrolled ? 'scrolled' : ''}`}>
                    <SwitchThemeIcon></SwitchThemeIcon>
                    <li className="cursor-pointer" onClick={toggleLanguage}>{content.glossary.language}</li>
                </div>
            </header>
    )
}