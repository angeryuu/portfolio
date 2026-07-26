import { useEffect, useMemo, useState, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import CustomShaderMaterial from 'three-custom-shader-material'
import vertexShader from '../shaders/wobble/vertex.glsl'
import fragmentShader from '../shaders/wobble/fragment.glsl'
import { useControls } from 'leva'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import * as THREE from 'three'
import { metalness, thickness } from 'three/src/nodes/core/PropertyNode.js';
import { createControlsSchema } from './controls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


export default function Bubble () {

    
    const [currentIndex, setCurrentIndex] = useState(1)
    const [scale, setScale] = useState(1)
    const [phase, setPhase] = useState('idle') // 'idle' | 'shrinking' | 'growing'
    const materialRef = useRef()
    const controls = useControls(
        createControlsSchema(materialRef)
    )
    // const [geometry, setGeometry] = useState(() => {
    //     let geom = new THREE.IcosahedronGeometry(2.5, 50)
    //     geom = mergeVertices(geom)
    //     geom.computeTangents()
    //     return geom
    // })

    /**
     * Load models
     */
    const models = useLoader(GLTFLoader, 'models.glb', (loader) => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./draco/')
        loader.setDRACOLoader(dracoLoader)
    })

    useEffect(() => {
    if (materialRef.current) {
        materialRef.current.needsUpdate = true
    }
    }, [currentIndex])


    // Extraemos todos los meshes de la escena, una sola vez
    const meshes = useMemo(() => {
        return models.scene.children.filter(child => child.isMesh)
    }, [models])

    /**
     * Loads basic geometry
     */
    const geometry = useMemo(() => {
        console.log('🔄 recalculando geometry con index:', currentIndex)
        const mesh = meshes[currentIndex]
        let geom = mesh.geometry.clone()
        geom = mergeVertices(geom)
        geom.computeTangents()
        geom.computeBoundingSphere() // 👈 añade esto
        return geom
    }, [models, currentIndex])

    // Cambia de modelo cada X segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setPhase('shrinking')
        }, 4000) // cada 4s inicia el cambio

        return () => clearInterval(interval)
    }, [])


    /**
     * Uniforms
     */
    const uniforms = useMemo(
            () => ({
            uTime: new THREE.Uniform(0),
            uPositionFrequency: new THREE.Uniform(0.382),
            uTimeFrequency: new THREE.Uniform(0.788),
            uStrength: new THREE.Uniform(0.398),

            uWarpPositionFrequency: new THREE.Uniform(0.204),
            uWarpTimeFrequency: new THREE.Uniform(0.723),
            uWarpStrength: new THREE.Uniform(0.561),

            uColorA: new THREE.Uniform(new THREE.Color("#09c0da")),
            uColorB: new THREE.Uniform(new THREE.Color("#284bd7"))
        }), []
    );

    
    useFrame((state, delta) => {
        if (materialRef.current) {
            const { clock } = state;
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }

        // if (phase === 'shrinking') {
        //     console.log("shrinking")
        //     setScale((s) => {
        //         const next = THREE.MathUtils.lerp(s, 0, delta * 4)
        //         if (next < 0.01) {
        //             console.log('🔵 llegó a 0, cambiando index')
        //             setCurrentIndex((i) => {
        //                 const newIndex = (i + 1) % meshes.length
        //                 return newIndex
        //             })
        //             setPhase('growing')
        //             return 0
        //         }
        //         return next
        //     })
        // }

        // if (phase === 'growing') {
        //     console.log("growing")
        //     setScale((s) => {
        //         const next = THREE.MathUtils.lerp(s, 1, delta * 4)
        //         if (next > 0.99) {
        //             console.log('🟢 llegó a 1, phase idle')
        //             setPhase('idle')
        //             return 1
        //         }
        //         return next
        //     })
        // }
    })

    return( 
    <>
            <mesh geometry={geometry} scale={scale} >
                <CustomShaderMaterial
                    ref={materialRef}
                    baseMaterial={THREE.MeshPhysicalMaterial}
                    vertexShader={vertexShader} 
                    fragmentShader={fragmentShader}
                    
                    // Your Uniforms
                    uniforms={uniforms}
                    // Mesh physical material
                    metalness={controls.metalness}
                    roughness= {controls.roughness}
                    color= "#ffffff"
                    ior={controls.ior}
                    transmission={controls.transmission}
                    thickness= {controls.thickness}
                    transparent= {true}
                    // side={THREE.DoubleSide}
                    wireframe= {false}
                    depthWrite={false}
                />
            </mesh>
            {/* <mesh position={[0, 0, -5]}>
                <planeGeometry args={[15, 15, 15]} />
                <meshBasicMaterial color="tomato"/>
            </mesh> */}
    </>)
}