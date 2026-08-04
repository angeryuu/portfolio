import { Leva } from 'leva';
import { Canvas } from '@react-three/fiber'
import Bubble from '../bubble/Bubble'
import Name from '../text/Name'

export function CanvasComponent() {
    return <>
        <div id="canvas-container">
            <Canvas camera={{position: [0, 0, 30]}}>
                <directionalLight position={[1, 2, 3]} intensity={1.5}/>
                <ambientLight intensity={0.5}/>
                <Leva hidden/>
                <Bubble/>
                <Name/>
            </Canvas>
        </div>
    </>
}