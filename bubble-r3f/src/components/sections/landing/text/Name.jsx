import { Center, Text3D, Text, useMatcapTexture } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext';
import * as THREE from 'three'

export default function Name(){

    const { theme } = useTheme();

    useEffect(() => {
        if (!theme) return; 

        console.log("El useEffect del Provider ya se ejecutó:", theme);
    }, [theme]);

    return (
        <>
                <Text
                position={[0, 5, -40]}
                color={theme === 'dark' ? "white" : "#6c6b6b"}
                scale={10}
                font='./fonts/MonumentExtended-Regular.otf'
                material-depthWrite={true}
                material-transparent={false}
                
                >ÁNGEL C. MARTOS</Text>
                <Text
                position={[0, -5, -40]}
                color={theme === 'dark' ? "#6c6b6b" : "#3c3c3c"}
                scale={4}
                fontWeight="Light"
                font='./fonts/Satoshi-LightItalic.ttf'
                material-depthWrite={true}
                material-transparent={false}
                >Creative Developer & 3D Generalist</Text>
        </>
    )
}
