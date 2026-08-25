import { useTheme } from '@/context/ThemeContext';
import meImg from '@/assets/images/me.jpg';
import { useRef } from 'react';
import { useFadeIn } from '@/components/hooks/useFadeIn';

export function About(){
    const ref = useRef()
    useFadeIn(ref)
    const { content } = useTheme();
    
    return <section ref={ref} id="about">
        <h2 className='title'>{content.about.sectionTitle}</h2>
        <div className="flex flex-col md:flex-row gap-10">
            <div className='w-full md:w-1/2 md:order-1 order-2'>
                <p className="whitespace-pre-line">{content.about.paragraphs}</p>
            </div>
            <div className='w-full md:w-1/2 md:order-2 order-1 flex justify-center'>
                <img className="rounded-full object-cover h-70 md:h-100" src={meImg} alt="" />
            </div>
        </div>
    </section>

}