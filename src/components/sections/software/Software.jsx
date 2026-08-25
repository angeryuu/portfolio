import { useTheme } from '@/context/ThemeContext';
import { useRef } from 'react';
import { useFadeIn } from '@/components/hooks/useFadeIn';

export function Software() {
    const ref = useRef()
    useFadeIn(ref)
    const { content } = useTheme();

    return (
        <section ref={ref}>
            <h2 className='title'>{content.software.sectionTitle}</h2>
            <div className="flex md:gap-40 gap-20 md:flex-row flex-col">
                <div className="md:w-1/2">
                    <h3 className="text-center mb-10 text-3xl text-primary">Web</h3>
                    <div className='flex flex-wrap justify-center gap-4 '>
                        {content.software.skills.web.map((skill, index) => <div key={index} className='tag'>{skill}</div>)}
                    </div>
                </div>
                <div className="md:w-1/2">
                    <h3 className="text-center mb-10 text-3xl text-primary">3D</h3>
                    <div className='flex flex-wrap justify-center gap-4 '>
                        {content.software.skills["3D"].map((skill, index) => <div key={index} className='tag'>{skill}</div>)}
                    </div>
                </div>
            </div>
        </section>
    )
}