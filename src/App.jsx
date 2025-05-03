import { useEffect, useRef } from 'react';
import { initTheme } from './utils/helpers';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

// Layout Components
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';

// UI Components
import BackgroundBlobs from './components/Ui/BackgroundBlobs';
import Stars from './components/Ui/Stars';
import SectionDivider from './components/Ui/SectionDivider';
import ScrollButton from './components/core/ScrollButton';

// Section Components
import HeroSection from './components/sections/Hero/HeroSection';
import Features from './components/sections/Features/Features';
import TextToSpeechDemo from './components/sections/Demo/TextToSpeechAndClickToRead';
import About from './components/sections/About/About';

// Accessibility Components
import CursorHighlighter from './components/accessibility/CursorHighlighter';
import FocusBorder from './components/accessibility/FocusBorder';
import ScreenReader from './components/accessibility/ScreenReader';

function App() {
  const appRef = useRef();

  // Initialize theme
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <AccessibilityProvider>
      <div className="app-container" ref={appRef}>
        {/* Visual Effects */}
        <BackgroundBlobs />
        <Stars />
        
        {/* Accessibility Features */}
        <CursorHighlighter />
        <FocusBorder />
        <ScreenReader />
        
        {/* Main Layout */}
        <Navbar />
        
        <main className="content-wrapper">
          <HeroSection />
          <SectionDivider variant={1} />
          <Features />
          <SectionDivider variant={2} />
          <TextToSpeechDemo />
          <SectionDivider variant={3} />
          <About />
          <Footer />
        </main>
        
        <ScrollButton containerRef={appRef} />
      </div>
    </AccessibilityProvider>
  );
}

export default App;
