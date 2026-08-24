import { useState } from 'react'

export function Tooltip({ children, text }) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {isVisible && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-sm rounded-md whitespace-nowrap z-50">
                    {text}
                    {/* Flechita */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
                </div>
            )}
        </div>
    )
}