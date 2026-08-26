import { useTheme } from '@/context/ThemeContext';
import './Experience.css';
import { useRef } from 'react';
import { useFadeIn } from '@/components/hooks/useFadeIn';

export function Experience(){
    const ref = useRef()
    useFadeIn(ref)
    const { content } = useTheme();

    return (
        <section ref={ref} id="experience">
            <h2 className='title'>{content.experience.sectionTitle}</h2>
            <ul className='timeline mb-32'>
                {content.experience.items.map((item, index) => {
                    return (
                    <li key={index} className='experience-card' style={{ gridRow: index + 1 }}>
                        <time className="text-center md:text-justify block text-base font-boldmb-6">{item.date}</time>
                        <h3 className="text-center md:text-justify text-2xl text-primary font-bold mb-2">{item.role}</h3>
                        <p className="text-center md:text-justify text-base mb-4 font-bold">{item.company}</p>
                        <p className="text-justify job-description text-sm">{item.description}</p>
                    </li>
                    )
                })}
            </ul>
        </section>
    )
    
}