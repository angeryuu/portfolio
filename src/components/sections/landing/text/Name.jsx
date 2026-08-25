import { Center, Text3D, Text, useMatcapTexture } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext';
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber';

export default function Name(){

    const { theme } = useTheme();

    const { size } = useThree()
    
    const [name, setName] = useState(`ÁNGEL C. MARTOS`);

    const { content } = useTheme();

    useEffect(() => {
        if (!theme) return; 

        if(size.width < 776){
            setName(name.slice(0,6) + '\n' + name.slice(6));
        }
    }, [theme]);

    return (
        <>
                <Text
                position={[0, 5, -40]}
                color={theme === 'dark' ? "white" : "#303030"}
                scale={size.width < 776 ? 5 : 10}
                textAlign={size.width < 776 ? 'center' : 'left'}
                lineHeight={size.width < 776 ? 1 : 1}
                font='./fonts/MonumentExtended-Regular.otf'
                material-depthWrite={true}
                material-transparent={false}
                
                >{name}</Text>
                <Text
                position={[0, size.width < 776 ? -10 : -5, -40]}
                color={theme === 'dark' ? "#6c6b6b" : "#3c3c3c"}
                scale={size.width < 776 ? 2 : 4}
                textAlign={size.width < 776 ? 'center' : 'left'}
                fontWeight="Light"
                font='./fonts/Satoshi-LightItalic.ttf'
                material-depthWrite={true}
                material-transparent={false}
                >Creative Developer & 3D Generalist</Text>
        </>
    )
}
