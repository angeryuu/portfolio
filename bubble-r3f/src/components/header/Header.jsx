import { useBubbleStore } from '../../stores/bubbleStore'

export function Header(){

    const setTargetIndex = useBubbleStore((state) => state.setTargetIndex)

    return (
        <>
            <header>
                <nav>
                    <li onMouseEnter={() => setTargetIndex(1)} onMouseLeave={() => setTargetIndex(0)}>
                        About me
                    </li>
                    <li>
                        Contact
                    </li>
                </nav>
            </header>
        </>
    )
}