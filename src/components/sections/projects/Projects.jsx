import { useTheme } from '@/context/ThemeContext';

import { useEffect, useRef, useState } from 'react';
import { ExternalLinkIcon } from '@/components/ui/icons/ExternalLinkIcon';

import { useFadeIn } from '@/components/hooks/useFadeIn';

export function Projects(){

    const { content } = useTheme();
    const ref = useRef()
    useFadeIn(ref)

    const [selectedVideo, setSelectedVideo] = useState('/portfolio/videos/ChickBath.webm')
    const [skills, setSkills] = useState(['Blender', 'Unreal Engine 5', 'Substance Painter', 'ZBrush'])
    const [link, setLink] = useState('https://www.artstation.com/artwork/qJ15nn ')
    const [date, setDate] = useState('2025')

    const videoRef = useRef()

    const handleMouseEnter = (src, skills, link, date) => {
        if(!src) return;
        setSelectedVideo(src)
        setSkills(skills)
        setLink(link)
        setDate(date)
    }

    useEffect(() => {
        if (videoRef.current && selectedVideo) {
            videoRef.current.load()
            videoRef.current.play().catch(() => {})
        }
        console.log(selectedVideo)
    }, [selectedVideo])
    

    return (
        <section ref={ref} id="projects">
            <h2 className='title'>{content.projects.sectionTitle}</h2>

            <div className='flex flex-col md:flex-row'>
                <div className='md:w-1/3'>

                    {content.projects.categories.map((list, index) => {
                        return (
                            <div key={index} >
                                <h3 className='md:text-left text-center md:mb-10 mb-5 text-primary font-bold text-3xl'>{list.label}</h3>
                                <ul key={list} className='md:inline-block md:mb-10 mb-5'>
                                    {list.items.map((item, index) => {
                                        return <li key={index} onMouseEnter={() => handleMouseEnter(item.videoSrc, item.skills, item.link, item.date)} className='md:text-left text-center mb-4 md:mb-6 mb:3 text-lg transition-all cursor-pointer hover:font-bold hover:text-2xl text-base'>
                                            {item.label}
                                        </li>
                                    })}
                                </ul>
                            </div>
                            )
                    })}
                </div>
                <div className='md:w-2/3 flex flex-col items-center'>
                    {date && <time className='mt-10 md:mt-0 mb-3 text-2xl'>{date}</time>}
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="object-cover rounded-2xl border-gray-800 border-2 border-solid"
                    >
                        <source src={selectedVideo} type="video/webm" />
                    </video>

                    <div className='flex flex-wrap mt-4 md:gap-8 gap-3 justify-center'>
                        <div className='flex flex-wrap md:gap-4 gap-3 justify-center'>
                            {skills.map((item, index) => <div key={index} className='tag'>{item}</div>)}
                        </div>
                        {link && <a href={link} target="_blank" className=' button flex justify-center items-center gap-3 whitespace-nowrap self-start'>{content.glossary.ver_mas}<ExternalLinkIcon fill="white" className="text-sm w-5"/></a>}
                    </div>
                </div>
            </div>
            
            
        </section>
    )
}