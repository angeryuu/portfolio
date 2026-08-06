import { useBubbleStore } from '@/stores/bubbleStore'
import content from '@/data/content.json'


export function Header(){

    const setTargetIndex = useBubbleStore((state) => state.setTargetIndex)

    return (
            <header className="py-3 px-10">
                <nav className='flex list-none gap-6'>
                    {/* <li onMouseEnter={() => setTargetIndex(1)} onMouseLeave={() => setTargetIndex(0)}>
                        About me
                    </li> */}

                    {/* Home Icon */}
                    <li><div className="bg-pink w-8 h-8 rounded-full cursor-pointer"></div></li>


                    {/* Nav Items */}
                    {content.nav.map((item, index) => <li className={`link ${index === 0 ? 'ml-auto' : ''}`}><a {...(item.name === "CV" ? { download: true } : {})} href={item.url}>{item.name}</a></li>)}
                </nav>
            </header>
    )
}