import content from '@/data/content.json';

import { useEffect, useRef, useState } from 'react';
import { ExternalLinkIcon } from '@/components/ui/ExternalLinkIcon';

import { useFadeIn } from '@/components/hooks/useFadeIn';

export function Projects(){


    const ref = useRef()
    useFadeIn(ref)

    const [selectedVideo, setSelectedVideo] = useState(null)
    const [skills, setSkills] = useState([])
    const [link, setLink] = useState(null)
    const [date, setDate] = useState(null)

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
    }, [selectedVideo])
    

    return (
        <section ref={ref} id="projects">
            <h2 className='title'>{content.projects.sectionTitle}</h2>

            <div className='flex'>
                <div className='w-1/3'>

                    {content.projects.categories.map((list, index) => {
                        return (
                            <>
                                <h3 className='not-first:mt-20 mb-20  text-pink font-bold text-3xl'>{list.label}</h3>
                                <ul key={list} className='inline-block'>
                                    {list.items.map((item, index) => {
                                        return <li onMouseEnter={() => handleMouseEnter(item.videoSrc, item.skills, item.link, item.date)} className='mb-6 text-lg transition-all cursor-pointer hover:font-bold hover:text-2xl text-white'>
                                            {item.label}
                                        </li>
                                    })}
                                </ul>
                            </>
                            )
                    })}
                </div>
                <div className='w-2/3 flex flex-col items-center'>
                    {date && <time className='mb-3 text-2xl'>{date}</time>}
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

                    <div className='flex mt-4 gap-8'>
                        <div className='flex gap-4'>
                            {skills.map(item => <div className='tag'>{item}</div>)}
                        </div>
                        {link && <a href={link} target="_blank" className='ml-auto button flex items-center gap-3 whitespace-nowrap'>{content.glossary.ver_mas}<ExternalLinkIcon fill="white" className="text-sm w-5"/></a>}
                    </div>
                </div>
            </div>
            
            
        </section>
    )
}