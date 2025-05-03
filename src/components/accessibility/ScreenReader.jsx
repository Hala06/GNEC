import { useState, useEffect, useRef } from 'react';

const ScreenReader = () => {
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
      } else if (element.textContent && element.tagName !== 'SCRIPT') {
        text = element.textContent.trim();
      }

      if (text) {
        setActiveText(text);
        highlightElement(element);
      }
    };

    const highlightElement = (element) => {
      element.style.transition = 'all 0.3s ease';
      element.style.boxShadow = '0 0 0 3px var(--highlight-color, #FFD700)';
      
      setTimeout(() => {
        element.style.boxShadow = '';
      }, 2000);
    };

    const handleClick = (e) => {
      if (activeText) {
        readText(activeText);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
      synthRef.current.cancel();
    };
  }, [activeText]);

  const readText = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    
    synthRef.current.speak(utterance);
  };

  return (
    <div className="screen-reader-controls">
      <button 
        onClick={() => readText(activeText)}
        disabled={!activeText || isReading}
        aria-label="Read highlighted text"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          padding: '10px',
          background: isReading ? 'var(--accent)' : 'var(--secondary)',
          color: 'var(--text)'
        }}
      >
        {isReading ? '⏹ Stop' : '▶ Read'}
      </button>
    </div>
  );
};

export default ScreenReader;