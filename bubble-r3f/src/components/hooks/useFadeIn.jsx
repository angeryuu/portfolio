import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useFadeIn(ref) {
    useEffect(() => {
        const el = ref.current
        if (!el) return

        const anim = gsap.fromTo(
            el,
            { opacity: 0, y: 80 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%', 
                    end: 'bottom 20%', 
                    toggleActions: 'play none none none',
                }
            }
        )

        return () => {
            anim.scrollTrigger?.kill()
            anim.kill()
        }
    }, [])
}