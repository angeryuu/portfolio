import { Center, Text3D, Text, useMatcapTexture } from '@react-three/drei'
import { useMemo } from 'react'
import { useTheme } from '@/context/ThemeContext';
import { useThree } from '@react-three/fiber';

const MOBILE_BREAKPOINT = 776;
const FULL_NAME = 'ÁNGEL C. MARTOS';

export default function Name(){

    const { theme } = useTheme();
    const { size } = useThree();

    const isMobile = size.width < MOBILE_BREAKPOINT;

    const displayName = useMemo(() => {
        return isMobile
            ? FULL_NAME.slice(0, 6) + '\n' + FULL_NAME.slice(6)
            : FULL_NAME;
    }, [isMobile]);

    return (
        <>
            <Text
                position={[0, isMobile ? 0 : 15, -40]}
                color={theme === 'dark' ? "white" : "#303030"}
                scale={isMobile ? 5 : 10}
                textAlign={isMobile ? 'center' : 'left'}
                lineHeight={1}
                font='./fonts/MonumentExtended-Regular.otf'
                material-depthWrite={true}
                material-transparent={false}
            >
                {displayName}
            </Text>
            <Text
                position={[0, isMobile ? -10 : 5, -40]}
                color={theme === 'dark' ? "#6c6b6b" : "#3c3c3c"}
                scale={isMobile ? 2 : 4}
                textAlign={isMobile ? 'center' : 'left'}
                fontWeight="Light"
                font='./fonts/Satoshi-LightItalic.ttf'
                material-depthWrite={true}
                material-transparent={false}
            >
                Creative Developer & 3D Generalist
            </Text>
        </>
    )
}