import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';


import LiquidBackground from './components/LiquidBackground';

function App() {
  return (
    <div className="min-h-screen text-textColor relative overflow-hidden">
      <LiquidBackground />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <Analytics />

    </div>
  );
}

export default App;
