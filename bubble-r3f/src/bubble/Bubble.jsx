import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import CustomShaderMaterial from 'three-custom-shader-material'
import vertexShader from '../shaders/wobble/vertex.glsl'
import fragmentShader from '../shaders/wobble/fragment.glsl'
import { useControls } from 'leva'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import * as THREE from 'three'
import { metalness, thickness } from 'three/src/nodes/core/PropertyNode.js';

export default function Bubble () {

    const debugObject = {}
    debugObject.colorA = '#006eff'
    debugObject.colorB = '#002f61'

    const materialRef = useRef()


    function hexToNormalisedArray(hex) {
                var r = parseInt(hex.slice(1, 3), 16) / 256,
                    g = parseInt(hex.slice(3, 5), 16) / 256,
                    b = parseInt(hex.slice(5, 7), 16) / 256

                return [r, g, b]
            }
    const controls = useControls(
        { uPositionFrequency: 
            {
                value: 0.382,
                min: 0,
                max: 2,
                onChange: (v) => {
                    materialRef.current.uniforms.uPositionFrequency.value = v
                } 
            },
            uTimeFrequency: 
            {
                value: 0.788,
                min: 0,
                max: 2,
                onChange: (v) => {
                    materialRef.current.uniforms.uTimeFrequency.value = v
                } 
            },
            uStrength: 
            {
                value: 0.4,
                min: 0,
                max: 2,
                onChange: (v) => {
                    materialRef.current.uniforms.uStrength.value = v
                } 
            },

            uWarpPositionFrequency: 
            {
                value: 0.2,
                min: 0,
                max: 2,
                onChange: (v) => {
                    materialRef.current.uniforms.uWarpPositionFrequency.value = v
                } 
            },
            uWarpTimeFrequency: 
            {
                value: 0.7,
                min: 0,
                max: 2,
                onChange: (v) => {
                    materialRef.current.uniforms.uWarpTimeFrequency.value = v
                } 
            },
            uWarpStrength: 
            {
                value: 0.5,
                min: 0,
                max: 2,
                onChange: (v) => {
                    materialRef.current.uniforms.uWarpStrength.value = v
                } 
            },
            uColorA: 
            {
                value: "#09c0da",
                onChange: (v) => {
                    materialRef.current.uniforms.uColorA.value = hexToNormalisedArray(v)
                } 
            },
            uColorB: 
            {
                value: "#284bd7",
                onChange: (v) => {
                    materialRef.current.uniforms.uColorB.value = hexToNormalisedArray(v)
                } 
            },
            roughness: 
            {
                value: 0,
                min: 0,
                max: 1,
                onChange: (v) => {
                    materialRef.current.roughness = v
                } 
            },
            metalness: 
            {
                value: 0,
                min: 0,
                max: 1,
                onChange: (v) => {
                    materialRef.current.metalness = v
                } 
            },
            thickness: 
            {
                value: 0.4,
                min: 0,
                max: 1,
                onChange: (v) => {
                    materialRef.current.thickness = v
                } 
            },
            
            transmission: 
            {
                value: 0.9,
                min: 0,
                max: 1,
                onChange: (v) => {
                    materialRef.current.transmission = v
                }
            },
            ior: 
            {
                value: 1.3,
                min: 1,
                max: 2.42,
                onChange: (v) => {
                    materialRef.current.ior = v
                } 
            }
        }
    )
    

    const uniforms = useMemo(
            () => ({
            uTime: new THREE.Uniform(0),
            uPositionFrequency: new THREE.Uniform(0.382),
            uTimeFrequency: new THREE.Uniform(0.788),
            uStrength: new THREE.Uniform(0.398),

            uWarpPositionFrequency: new THREE.Uniform(0.204),
            uWarpTimeFrequency: new THREE.Uniform(0.723),
            uWarpStrength: new THREE.Uniform(0.561),

            uColorA: new THREE.Uniform(new THREE.Color(debugObject.colorA)),
            uColorB: new THREE.Uniform(new THREE.Color(debugObject.colorB))
        }), []
    );

    // Geometry
    let geometry = new THREE.IcosahedronGeometry(2.5, 50)
    geometry = mergeVertices(geometry)
    geometry.computeTangents()


    useFrame((state) => {
        if (materialRef.current) {
            const { clock } = state;
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    })

    return( 
    <>
            <mesh geometry={geometry}>
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