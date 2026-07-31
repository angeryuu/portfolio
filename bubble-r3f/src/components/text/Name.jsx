import { Center, Text3D, Text, useMatcapTexture } from '@react-three/drei'
import { useState } from 'react'
import * as THREE from 'three'

export default function Name(){

    return (
        <>
                <Text
                position={[0, 5, -40]}
                scale={10}
                font='./fonts/MonumentExtended-Regular.otf'
                material-depthWrite={true}
                material-transparent={false}
                
                >Testing text</Text>
                <Text
                position={[0, -5, -40]}
                color="#6c6b6b"
                scale={4}
                fontWeight="Light"
                font='./fonts/Satoshi-LightItalic.ttf'
                material-depthWrite={true}
                material-transparent={false}
                >Just another text</Text>
        </>
    )
}
