import { useBubbleStore } from '@/stores/bubbleStore'
import content from '@/data/content.json'
import SwitchThemeIcon from '@/components/ui/SwitchThemeIcon/SwitchThemeIcon';


export function Header(){

    const setTargetIndex = useBubbleStore((state) => state.setTargetIndex)
    
    return (
            <header className="md:py-8 md:px-10 py-4 px-6 absolute w-full bg-background">
                <nav className='flex justify-center list-none md:gap-20 gap-3'>
                    {/* <li onMouseEnter={() => setTargetIndex(1)} onMouseLeave={() => setTargetIndex(0)}>
                        About me
                    </li> */}

                    {/* Home Icon */}
                    {/* <li><div className="bg-pink w-8 h-8 rounded-full cursor-pointer"></div></li> */}


                    {/* Nav Items */}
                    {content.nav.map((item, index) => <li onMouseEnter={() => setTargetIndex((index+1)%3)} onMouseLeave={() => setTargetIndex(0)} className={`link ${index === 0 ? '' : ''}`}><a {...(item.name === "CV" ? { download: true } : {})} href={item.url}>{item.name}</a></li>)}

                    <SwitchThemeIcon></SwitchThemeIcon>
                </nav>
            </header>
    )
}