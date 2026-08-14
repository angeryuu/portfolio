import './App.css'
import { Header } from './components/layout/header/Header.jsx'
import { CanvasComponent } from './components/sections/landing/canvas/CanvasComponent.jsx';
import {About} from './components/sections/about/About.jsx'
import { Experience } from './components/sections/experience/Experience.jsx';
import { Projects } from './components/sections/projects/Projects.jsx';
import { Footer } from './components/layout/footer/Footer.jsx';
import { Software } from './components/sections/software/Software.jsx';
import { Education } from './components/sections/education/Education.jsx';

function App() {

  return (
      <>
        <Header/>

        <CanvasComponent/>

        <div className="h-screen" />

        <main>
          <About/>
          <Experience/>
          <Software/>
          <Education/>
          <Projects/>
        </main>
        
        <Footer/>
      </>
  )
}

export default App
