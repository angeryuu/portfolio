import content from '@/data/content.json'
import './Experience.css';

export function Experience(){
    return (
        <section>
            <h2 className='title'>{content.experience.sectionTitle}</h2>
            <ul className='timeline'>
                {content.experience.items.map((item, index) => {
                    return (
                    <li key={index} className='experience-card' style={{ gridRow: index + 1 }}>
                        <time className="block text-base font-bold text-white mb-6">{item.date}</time>
                        <h3 className="text-2xl text-pink font-bold mb-2">{item.role}</h3>
                        <p className="text-base text-white mb-4 font-bold">{item.company}</p>
                        <p className="job-description text-justify text-sm">{item.description}</p>
                    </li>
                    )
                })}
            </ul>
        </section>
    )
    
}