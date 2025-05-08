import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const ScreenReader = () => {
  const { settings, updateSetting } = useAccessibility();
  const [activeText, setActiveText] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const synthRef = useRef(null);
  const helpTimeoutRef = useRef(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;

    const handleMouseOver = (e) => {
      const element = e.target;
      let text = '';
     
      if (element.getAttribute('aria-label')) {
        text = element.getAttribute('aria-label');
      } else if (element.textContent && !element.closest('script, style')) {
        text = element.textContent.trim();
      }

      if (text) {
        setActiveText(text);
        highlightElement(element);
       
        if (element.closest('button, a, [role="button"], [tabindex]')) {
          setShowHelp(true);
          clearTimeout(helpTimeoutRef.current);
          helpTimeoutRef.current = setTimeout(() => setShowHelp(false), 3000);
        }
      }
    };

    const highlightElement = (element) => {
      element.style.transition = 'all 0.3s ease';
      element.style.boxShadow = `0 0 0 2px ${settings.highlight.color}`;
     
      setTimeout(() => {
        element.style.boxShadow = '';
      }, 2000);
    };

    const handleClick = (e) => {
      if (activeText && settings.isScreenReaderActive) {
        readText(activeText);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
      synthRef.current?.cancel();
      clearTimeout(helpTimeoutRef.current);
    };
  }, [activeText, settings.isScreenReaderActive, settings.highlight.color]);

  const readText = (text) => {
    if (synthRef.current?.speaking) {
      synthRef.current.cancel();
    }

    if (!text || !settings.isScreenReaderActive) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.speech.rate;
    utterance.pitch = settings.speech.pitch;
    utterance.voice = settings.speech.voice;
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    synthRef.current.speak(utterance);
  };

  const toggleScreenReader = () => {
    const newValue = !settings.isScreenReaderActive;
    updateSetting('isScreenReaderActive', newValue);
    
    // Provide auditory feedback
    if (newValue) {
      const feedback = new SpeechSynthesisUtterance("Screen reader activated");
      feedback.voice = settings.speech.voice;
      synthRef.current.speak(feedback);
    } else {
      synthRef.current?.cancel();
    }
  };

  return (
    <motion.div
      className="screen-reader-controls"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 10000,
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-end'
      }}
    >
      {showHelp && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'var(--background)',
            color: 'var(--text)',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '0.9rem',
            maxWidth: '200px',
            marginRight: '10px'
          }}
        >
          Click to read aloud. Double-click to activate.
        </motion.div>
      )}

      <button
        onClick={toggleScreenReader}
        aria-label={settings.isScreenReaderActive ? 'Turn off screen reader' : 'Turn on screen reader'}
        style={{
          padding: '14px',
          borderRadius: '50%',
          background: settings.isScreenReaderActive ? 'var(--accent)' : 'var(--secondary)',
          color: settings.isScreenReaderActive ? 'white' : 'var(--text)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        {settings.isScreenReaderActive ? '🔊' : '🔇'}
      </button>

      {settings.isScreenReaderActive && (
        <button
          onClick={() => isReading ? synthRef.current.cancel() : readText(activeText)}
          disabled={!activeText}
          aria-label={isReading ? 'Stop reading' : 'Read highlighted text'}
          style={{
            padding: '12px 16px',
            borderRadius: '50px',
            background: isReading ? 'var(--error)' : 'var(--accent)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            opacity: activeText ? 1 : 0.6,
            transition: 'all 0.3s ease'
          }}
        >
          {isReading ? '⏹ Stop' : '▶ Read'}
        </button>
      )}
    </motion.div>
  );
};

export default ScreenReader;