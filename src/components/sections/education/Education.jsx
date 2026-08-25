import { useTheme } from '@/context/ThemeContext';
import { useRef } from 'react';
import { useFadeIn } from '@/components/hooks/useFadeIn';

export function Education(){
    const ref = useRef()
    useFadeIn(ref)
    const { content } = useTheme();

    return (
        <section ref={ref}>
            <h2 className="title">{content.education.sectionTitle}</h2>
            <ul className='grid md:grid-cols-2 md-gap-y-30 gap-y-10 gap-x-30'>
                {content.education.titles.map((title, index) => {
                    return <li key={index} >
                            <time className="text-center block text-base font-bold mb-6">{title.date}</time>
                            <h3 className={`text-xl ${index < 2 ? 'text-primary font-bold' : 'text-base font-bold'} text-center mb-2`}>{title.name}</h3>
                            <p className="text-base-secondary  mb-4  text-center">{title.institution}</p>
                        </li>
                })}
            </ul>
        </section>
    )
}