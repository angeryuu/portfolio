import content from '@/data/content.json';
import { ExternalLinkIcon } from '../../ui/ExternalLinkIcon';

export function Footer () {

    const currentYear = new Date().getFullYear();

    return (
        <>
        <footer>
            <h2 class="title">{content.contact.sectionTitle}</h2>
            <div className='flex items-center justify-between mb-24'>
                {content.contact.links.map(link => {
                    return <a href="" target="_blank" className='text-white text-xl flex items-center gap-3 whitespace-nowrap'>{link}<ExternalLinkIcon fill="white" className="text-sm w-5" /></a>
                })}
            </div>
            
        </footer>
        <p class="text-center text-sm text-gray-300 mb-10">© {currentYear}. {content.copyright}</p>
        </>
    )
}