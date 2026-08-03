import { OrbitControls } from '@react-three/drei'
import './App.css'
import Bubble from './components/bubble/Bubble';
import { Header } from './components/header/Header.jsx'
import Name from './components/text/Name';
import { Leva } from 'leva';
import { Canvas } from '@react-three/fiber'

function App() {

  return (
      <>
      <Header/>
      
      <Canvas camera={{position: [0, 0, 30]}}>
        <directionalLight position={[1, 2, 3]} intensity={1.5}/>
        <ambientLight intensity={0.5}/>
        <Leva hidden/>
        <Bubble/>
        <Name/>
      </Canvas>
      </>
  )
}

export default App
