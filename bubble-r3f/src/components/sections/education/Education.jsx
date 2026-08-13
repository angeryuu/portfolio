import content from '@/data/content.json'
import { useRef } from 'react';
import { useFadeIn } from '@/components/hooks/useFadeIn';

export function Education(){
    const ref = useRef()
    useFadeIn(ref)

    return (
        <section ref={ref}>
            <h2 className="title">{content.education.sectionTitle}</h2>
            <ul className='grid grid-cols-2 gap-y-30 gap-x-30'>
                {content.education.titles.map((title, index) => {
                    return <li key={index} >
                            <time className="text-center block text-base font-bold text-white mb-6">{title.date}</time>
                            <h3 className={`text-xl ${index < 2 ? 'text-primary font-bold' : ''} text-center mb-2`}>{title.name}</h3>
                            <p className="text-base  mb-4 text-gray-400 text-center">{title.institution}</p>
                        </li>
                })}
            </ul>
        </section>
    )
}