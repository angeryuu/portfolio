import content from '@/data/content.json';
import { ExternalLinkIcon } from '@/components/ui/icons/ExternalLinkIcon';
import { useRef } from 'react';
import { useFadeIn } from '@/components/hooks/useFadeIn';
import { ClipboardButton } from '@/components/ui/ClipboardButton';

export function Footer () {

    const currentYear = new Date().getFullYear();
    const ref = useRef()
    useFadeIn(ref)

    return (
        <>
        <footer ref={ref}>
            <h2 class="title">{content.contact.sectionTitle}</h2>
            <div className='flex items-center justify-between mb-24'>
                {content.contact.links.map((item) => {
                    return <div className="flex"><a href={item.url} target={item.name === "Linkedin" ? "_blank" : "_self"} {...(item.name === "CV" ? { download: true } : {})} className='w-65 justify-center text-white text-xl flex items-center gap-3 whitespace-nowrap'>
                        {item.name}<ExternalLinkIcon fill="white" className="text-sm w-5" />
                    </a>
                    {item.name === "angelcmartos@gmail.com" ? <ClipboardButton text="angelcmartos@gmail.com" className="ml-3 w-7" /> : null}</div>
                })}
            </div>
            
        </footer>
        <p class="text-center text-sm text-gray-300 mb-10">© {currentYear}. {content.copyright}</p>
        </>
    )
}