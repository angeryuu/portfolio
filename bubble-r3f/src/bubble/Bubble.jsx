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

    const [positions, setPositions] = useState([])
    const [bufferAttributes, setBufferAttributes] = useState(null)
    const [maxCount, setMaxCount] = useState(0)
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


    

    /**
     * Loads basic geometry
     */
    const geometry = useMemo(() => {
        console.log(models)
        const mesh = models.scene.children[1]
        let geom = mesh.geometry.clone()

        geom = mergeVertices(geom)
        geom.computeTangents()
        return geom
    }, [models])

    // useEffect(() => {
    //     return () => geometry.dispose()
    // }, [geometry])

    
    /**
     * Stores the attributes position array and creates buffer attributes for each model
     */
    useEffect(() => {
        const pos = models.scene.children.map(child => child.geometry.attributes.position)

        // for(const p of pos){
        //     if(p.count > maxCount)
        //         setMaxCount(p.count)
        // }

     }, [models])

    // useEffect(() => {
    //     const bufferArray = []
        
    //     for(const p of positions){

    //         const originalArray = p.array
    //         const newArray = new Float32Array(maxCount * 3)
        
    //         for(let i = 0; i < maxCount; i++){
    //             const i3 = i * 3;
                
    //             if(i3 < originalArray.length) {
    //                 newArray[i3 + 0] = originalArray[i3 + 0]
    //                 newArray[i3 + 1] = originalArray[i3 + 1]
    //                 newArray[i3 + 2] = originalArray[i3 + 2]
    //             }else{
    //                 const randomIndex = Math.floor(p.count * Math.random()) * 3
    //                 newArray[i3 + 0] = originalArray[randomIndex + 0];
    //                 newArray[i3 + 1] = originalArray[randomIndex + 1];
    //                 newArray[i3 + 2] = originalArray[randomIndex + 2];
    //             }
    //         }

    //         bufferArray.push(new THREE.Float32BufferAttribute(newArray, 3))
    //     }

    //     setBufferAttributes(bufferArray)
    // }, [maxCount])

    // useEffect(() => {
    //     if (!bufferAttributes) return

    //     const newGeometry = new THREE.BufferGeometry()

        
    //     newGeometry.setAttribute('position', bufferAttributes[2])
    //     newGeometry.setAttribute('normal', geometry.attributes.normal)
    //     newGeometry.setAttribute('uv', geometry.attributes.uv)
    //     newGeometry.setAttribute('tangent', geometry.attributes.tangent)
    //     // newGeometry = mergeVertices(newGeometry)
    //     newGeometry.computeVertexNormals()
    //     newGeometry.computeTangents()
    //     newGeometry.setIndex(null)

    //     setGeometry(newGeometry)

    // }, [bufferAttributes])
    
    /**
     * Material ref and controls
     */
    const materialRef = useRef()
    const controls = useControls(
        createControlsSchema(materialRef)
    )

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