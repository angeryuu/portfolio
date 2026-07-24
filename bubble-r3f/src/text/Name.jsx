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
            <Center >
                <Text
                position-z={-17}
                size={1}
                material={material}
                >Just texting hehehhehe</Text>
            </Center>
        </>
    )
}
