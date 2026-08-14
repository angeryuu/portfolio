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
            <h2 className="title">{content.contact.sectionTitle}</h2>
            <div className='flex items-center md:justify-between justify-center gap-10 md:gap-0 mb-24 md:flex-nowrap flex-wrap'>
                {content.contact.links.map((item, index) => {
                    return <div key={index} className="flex"><a href={item.url} target={item.name === "Linkedin" ? "_blank" : "_self"} {...(item.name === "CV" ? { download: true } : {})} className='w-65 justify-center text-base text-xl flex items-center gap-3 whitespace-nowrap'>
                        {item.name}<ExternalLinkIcon className="fill-base text-sm w-5" />
                    </a>
                    {item.name === "angelcmartos@gmail.com" ? <ClipboardButton text="angelcmartos@gmail.com" className="ml-3 w-7" /> : null}</div>
                })}
            </div>
            
        </footer>
        <p className="text-center text-sm text-gray-300 mb-10">© {currentYear}. {content.copyright}</p>
        </>
    )
}