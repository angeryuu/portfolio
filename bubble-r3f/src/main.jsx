import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import './index.css'
import App from './App.jsx'
import { Header } from './components/header/Header.jsx'

createRoot(document.getElementById('root')).render(
  
    <div id="canvas-container">
      <Header/>
      <Canvas camera={{position: [0, 0, 30]}}>
            <App />
      </Canvas>
    </div>
    
)
