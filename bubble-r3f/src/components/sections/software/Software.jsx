import content from '@/data/content.json'
import { useRef } from 'react';
import { useFadeIn } from '@/components/hooks/useFadeIn';

export function Software() {
    const ref = useRef()
    useFadeIn(ref)

    return (
        <section ref={ref}>
            <h2 className='title'>{content.software.sectionTitle}</h2>
            <div class="flex gap-40">
                <div class="w-1/2">
                    <h3 class="text-center mb-10 text-3xl text-primary">Web</h3>
                    <div className='flex flex-wrap justify-center gap-4 '>
                        {content.software.skills.web.map(skill => <div className='tag'>{skill}</div>)}
                    </div>
                </div>
                <div class="w-1/2">
                    <h3 class="text-center mb-10 text-3xl text-primary">3D</h3>
                    <div className='flex flex-wrap justify-center gap-4 '>
                        {content.software.skills["3D"].map(skill => <div className='tag'>{skill}</div>)}
                    </div>
                </div>
            </div>
        </section>
    )
}