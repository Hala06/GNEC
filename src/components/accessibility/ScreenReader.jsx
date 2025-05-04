import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const ScreenReader = () => {
  const { settings, updateSetting } = useAccessibility();
  const [activeText, setActiveText] = useState('');
  const [isReading, setIsReading] = useState(false);
  const synthRef = useRef(null);

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
      }
    };

    const highlightElement = (element) => {
      element.style.transition = 'all 0.3s ease';
      element.style.outline = `2px solid ${settings.highlight.color}`;
      
      setTimeout(() => {
        element.style.outline = '';
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

    synthRef.current.speak(utterance);
  };

  const toggleScreenReader = () => {
    if (isReading) {
      synthRef.current?.cancel();
    }
    updateSetting('isScreenReaderActive', !settings.isScreenReaderActive);
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
        gap: '10px'
      }}
    >
      <button
        onClick={toggleScreenReader}
        aria-label={settings.isScreenReaderActive ? 'Turn off screen reader' : 'Turn on screen reader'}
        style={{
          padding: '12px',
          borderRadius: '50%',
          background: settings.isScreenReaderActive ? 'var(--accent)' : 'var(--secondary)',
          color: settings.isScreenReaderActive ? 'white' : 'var(--text)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {settings.isScreenReaderActive ? '🔊' : '🔇'}
      </button>

      {settings.isScreenReaderActive && (
        <button
          onClick={() => readText(activeText)}
          disabled={!activeText || isReading}
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
            gap: '8px'
          }}
        >
          {isReading ? '⏹ Stop' : '▶ Read'}
        </button>
      )}
    </motion.div>
  );
};

export default ScreenReader;
