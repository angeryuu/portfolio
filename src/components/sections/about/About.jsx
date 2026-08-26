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
        <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className='w-full flex flex-col gap-10 md:w-1/2 md:order-1 order-2'>

                <div class="flex gap-30">
                    <div>
                        <h3 className="text-2xl text-primary font-bold mb-2">{content.about.name.title}</h3>
                        <p className="whitespace-pre-line text-justify text-sm">{content.about.name.value}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl text-primary font-bold mb-2">{content.about.location.title}</h3>
                        <p className="whitespace-pre-line text-justify text-sm">{content.about.location.value}</p>
                    </div>
                </div>


                <div>
                    <h3 className="text-2xl text-primary font-bold mb-2">{content.about.trajectory.title}</h3>
                    <p className="whitespace-pre-line text-justify text-sm">{content.about.trajectory.value}</p>
                </div>


                <div>
                    <h3 className="text-2xl text-primary font-bold mb-2">{content.about.hobbies.title}</h3>
                    <p className="whitespace-pre-line text-justify text-sm">{content.about.hobbies.value}</p>
                </div>
                
            </div>
            <div className='w-full md:w-1/2 md:order-2 order-1 flex justify-center'>
                <img className="rounded-full object-cover h-70 md:h-100" src={meImg} alt="" />
            </div>
        </div>
    </section>

}