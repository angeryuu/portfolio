import { OrbitControls } from '@react-three/drei'
import './App.css'
import Bubble from './components/bubble/Bubble';
import Name from './components/text/Name';

function App() {

  return (
      <>
        {/* <color args={['#242424']} attach="background"/> */}
        <OrbitControls makeDefault/>

        <directionalLight position={[1, 2, 3]} intensity={5.5}/>
        <ambientLight intensity={9.5}/>

        
        <Bubble/>
        <Name/>
      </>
  )
}

export default App
