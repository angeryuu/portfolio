import { useBubbleStore } from '@/stores/bubbleStore'
import { useTheme } from '@/context/ThemeContext';
import SwitchThemeIcon from '@/components/ui/SwitchThemeIcon/SwitchThemeIcon';


export function Header(){

    const setTargetIndex = useBubbleStore((state) => state.setTargetIndex)
    const { content, toggleLanguage } = useTheme();
    
    
    return (
            <header className="md:py-8 md:px-10 py-4 px-6 absolute w-full bg-background text-sm">
                <nav className='flex justify-center items-center list-none md:gap-20 gap-3'>
                    
                    {content.nav.map((item, index) => <li key={index} onMouseEnter={() => setTargetIndex((index+1)%4)} onMouseLeave={() => setTargetIndex(0)} className={`link ${index === 0 ? '' : ''}`}><a {...(item.name === "CV" ? { download: true } : {})} href={item.url}>{item.name}</a></li>)}
                        
                    <div class="flex justify-end w-full md:w-auto md:bottom-5 md:right-5 gap-5 fixed bottom-0 bg-background md:bg-transparent p-4 z-1">
                        <SwitchThemeIcon></SwitchThemeIcon>
                        <li className="cursor-pointer" onClick={toggleLanguage}>{content.glossary.language}</li>
                    </div>
                    
                </nav>
            </header>
    )
}