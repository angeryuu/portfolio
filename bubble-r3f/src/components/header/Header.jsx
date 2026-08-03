import { useBubbleStore } from '../../stores/bubbleStore'
import content from '../../data/content.json'


export function Header(){

    const setTargetIndex = useBubbleStore((state) => state.setTargetIndex)

    return (
        <>
            <header class="p-3">
                <nav className='flex list-none gap-6'>
                    {/* <li onMouseEnter={() => setTargetIndex(1)} onMouseLeave={() => setTargetIndex(0)}>
                        About me
                    </li> */}
                    {content.nav.map((item, index) => <li className={`link ${index === 0 ? 'ml-auto' : ''}`}>{item}</li>)}
                </nav>
            </header>
        </>
    )
}