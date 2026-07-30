import { Center, Text3D, Text, useMatcapTexture } from '@react-three/drei'
import { useState } from 'react'

export default function Name(){

    const [matcapTexture] = useMatcapTexture('7E8174_39444D_CECAA7_B3B49B', 256)
    const [material, setMaterial] = useState()

    return (
        <>
            <meshMatcapMaterial ref={setMaterial} matcap={ matcapTexture } />
            {/* <Center center>
                <Text3D 
                position-z={-18}
                size={1}
                font="./fonts/helvetiker_regular.typeface.json" 
                material={material} 
                >Just texting hehehhehe</Text3D>
            </Center> */}
                <Text
                position={[0, 10, -40]}
                scale={15}
                font='./fonts/Satoshi-Variable.ttf'
                material-depthWrite={true}
                material-transparent={false}
                >Ángel C. Martos</Text>
                <Text
                position={[0, -10, -40]}
                scale={6}
                fontWeight="Light"
                font='./fonts/Satoshi-Light.ttf'
                material-depthWrite={true}
                material-transparent={false}
                >Programmer & 3D Artist</Text>
            
        </>
    )
}
