import { useRef, useEffect } from 'react';
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SectionDivider from './components/SectionDivider'
import Features from './components/Features'
import TextToSpeechAndClickToRead from './components/TextToSpeechAndClickToRead'
import About from './components/About'
import Footer from './components/Footer'
import BackgroundBlobs from './components/BackgroundBlobs'
import ScrollButton from './components/ScrollButton'
import Stars from './components/Stars'

function App() {
  return (
    <main>
      <BackgroundBlobs />
      <Stars />
      <div style={{
        backgroundColor: 'var(--background)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        paddingTop: '80px',
        position: 'relative',
        zIndex: 1
      }}>
        <Navbar />
        <HeroSection />
        <SectionDivider variant={1} />
        <Features />
        <SectionDivider variant={2} />
        <TextToSpeechAndClickToRead />
        <SectionDivider variant={3} />
        <About />
        <Footer />
        <ScrollButton />
      </div>
    </main>
  )
}

export default App
