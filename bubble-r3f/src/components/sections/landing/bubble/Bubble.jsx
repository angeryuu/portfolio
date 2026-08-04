import { useEffect, useMemo, useState, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text, useFBO } from '@react-three/drei'
import { useControls } from 'leva'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import CustomShaderMaterial from 'three-custom-shader-material'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import vertexShader from './shaders/bubble/vertex.glsl'
import fragmentShader from './shaders/bubble/fragment.glsl'

import { createControlsSchema } from './controls';
import { useBubbleStore } from '../../../../stores/bubbleStore'


import gsap from 'gsap'
import * as THREE from 'three'
import { thickness } from 'three/src/nodes/TSL.js';

export default function Bubble () {

    const { scene, camera, gl } = useThree()
    const fbo = useFBO(4096, 2048, {
        type: THREE.UnsignedByteType
    })

    // const [currentIndex, setCurrentIndex] = useState(1)
    const targetIndex = useBubbleStore((state) => state.targetIndex)
    const [currentIndex, setCurrentIndex] = useState(targetIndex)

    const isAnimatingRef = useRef(false)
    const meshRef = useRef()
    const materialRef = useRef()
    const scaleRef = useRef(1)
    const phaseRef = useRef('idle')
    const pendingIndexRef = useRef(null)



    const controls = useControls(
        createControlsSchema(materialRef, scene, camera, gl, fbo)
    )

    /**
     * Load models
     */
    const models = useLoader(GLTFLoader, 'models.glb', (loader) => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./draco/')
        loader.setDRACOLoader(dracoLoader)
    })


    /**
     * Everytime model changes, material needs to be updated
     */
    useEffect(() => {
    if (materialRef.current) {
        materialRef.current.needsUpdate = true
    }
    }, [currentIndex])


    /**
     * Extract 
     */
    const meshes = useMemo(() => {
        return models.scene.children.filter(child => child.isMesh)
        
    }, [models])

    /**
     * Loads basic geometry
     */
    const geometry = useMemo(() => {
        const mesh = meshes[targetIndex]
        let geom = mesh.geometry.clone()
        geom = mergeVertices(geom)
        geom.computeTangents()
        geom.computeBoundingSphere()
        return geom
    }, [models, currentIndex])


    /**
     * Reacts when the index changes because of mouse over
     */
    // Reacciona a cambios del store, disparando la animación con GSAP
    useEffect(() => {
        if (targetIndex === currentIndex) return

        pendingIndexRef.current = targetIndex

        if (isAnimatingRef.current) return 

        isAnimatingRef.current = true

        gsap.to(meshRef.current.scale, {
            x: 0, y: 0, z: 0,
            duration: 0.25,        
            ease: 'power2.in',
            onComplete: () => {
                setCurrentIndex(pendingIndexRef.current)

                gsap.to(meshRef.current.scale, {
                    x: 1, y: 1, z: 1,
                    duration: 0.25,
                    ease: 'power2.out',
                    onComplete: () => {
                        isAnimatingRef.current = false
                        
                        // if (pendingIndexRef.current !== targetIndexRef.current) {
                           
                        // }
                    }
                })
            }
        })
    }, [targetIndex])


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

            fresnelIntensity: new THREE.Uniform(1.0),

            uColorA: new THREE.Uniform(new THREE.Color("#09c0da")),
            uColorB: new THREE.Uniform(new THREE.Color("#284bd7"))
        }), []
    );

    
    useFrame((state, delta) => {
        if (materialRef.current) {
            const { clock } = state;
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }

        if(meshRef.current){
            meshRef.current.rotation.y += delta * 0.3;
            meshRef.current.rotation.z += delta * 0.5;
        }
        
    })

    return( 
    <>      
            
            <mesh geometry={geometry} ref={meshRef} >
                
                
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
            {/* <mesh position={[0, 0, -5]} scale={1.3}>
                <planeGeometry args={[15, 15, 15]} />
                <meshBasicMaterial color="blue"/>
            </mesh> */}
    </>)
}