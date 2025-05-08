import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { speakText, highlightElementForReading } from '../../../services/speechSynthesis';

const TextToSpeechAndClickToRead = () => {
  const { settings, updateSetting } = useAccessibility();
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeElement, setActiveElement] = useState(null);

  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
   
    if (availableVoices.length > 0 && !selectedVoice) {
      const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
      setSelectedVoice(defaultVoice.voiceURI);
      updateSetting('speech', {
        ...settings.speech,
        voice: defaultVoice
      });
    }
  }, [selectedVoice, settings.speech, updateSetting]);

  useEffect(() => {
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    loadVoices();
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [loadVoices]);

  const handleSpeak = (content) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(content || text);
    utterance.voice = voices.find(v => v.voiceURI === selectedVoice);
    utterance.lang = language;
    utterance.rate = settings.speech.rate;
    utterance.pitch = settings.speech.pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (activeElement) {
        activeElement.style.backgroundColor = '';
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleElementClick = (e, content) => {
    const element = e.currentTarget;
    setActiveElement(element);
    
    // Highlight element
    element.style.transition = 'background-color 0.3s ease';
    element.style.backgroundColor = `${settings.highlight.color}30`;
    
    // Speak content
    handleSpeak(content || element.textContent);
  };

  return (
    <motion.section
      id="demo"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      style={{
        padding: '6rem 2rem',
        background: 'var(--background)',
        maxWidth: '1200px',
        margin: '4rem auto',
        borderRadius: '24px'
      }}
      aria-labelledby="demo-heading"
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 id="demo-heading" style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: 'var(--text)'
        }}>
          Interactive Demo
        </h2>
        <p style={{
          color: 'var(--text)',
          opacity: 0.8,
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Click on any text element to hear it read aloud. The element will highlight while reading.
          Use the controls to adjust voice and speed settings.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Controls Panel */}
        <motion.div
          style={{
            padding: '2rem',
            background: 'var(--secondary)',
            borderRadius: '16px',
            position: 'sticky',
            top: '100px'
          }}
          whileHover={settings.reducedMotion ? {} : { y: -5 }}
        >
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Settings</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="language-select" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text)'
            }}>
              Language:
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '2px solid var(--border)',
                background: 'var(--background)',
                color: 'var(--text)'
              }}
              aria-label="Select language"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="voice-select" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text)'
            }}>
              Voice:
            </label>
            <select
              id="voice-select"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '2px solid var(--border)',
                background: 'var(--background)',
                color: 'var(--text)'
              }}
              aria-label="Select voice"
            >
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="rate-range" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text)'
            }}>
              Speed: {settings.speech.rate.toFixed(1)}
            </label>
            <input
              id="rate-range"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.speech.rate}
              onChange={(e) => updateSetting('speech', {
                ...settings.speech,
                rate: parseFloat(e.target.value)
              })}
              style={{
                width: '100%',
                accentColor: 'var(--accent)'
              }}
              aria-label="Adjust speech rate"
            />
          </div>

          <button
            onClick={() => isSpeaking ? window.speechSynthesis.cancel() : handleSpeak()}
            disabled={!text && !isSpeaking}
            aria-label={isSpeaking ? 'Stop reading' : 'Read text aloud'}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              background: isSpeaking ? 'var(--error)' : 'var(--accent)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            {isSpeaking ? '⏹ Stop Reading' : '▶ Read Text'}
          </button>
        </motion.div>

        {/* Content Area */}
        <motion.div
          style={{
            padding: '2rem',
            background: 'var(--secondary)',
            borderRadius: '16px',
            minHeight: '400px'
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="text-input" style={{
              display: 'block',
              marginBottom: '1rem',
              fontWeight: '600',
              color: 'var(--text)'
            }}>
              Try reading your own text:
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste text here to hear it read aloud..."
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid var(--border)',
                background: 'var(--background)',
                color: 'var(--text)',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}
              aria-label="Text input for speech synthesis"
              onClick={(e) => handleElementClick(e, text)}
            />
          </div>

          <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Sample Content</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              "AccessEd helps make the web accessible to everyone with features like text-to-speech, focus highlighting, and customizable cursors.",
              "Our mission is to break down digital barriers and create an inclusive browsing experience for users of all abilities.",
              "Try hovering over interactive elements to see them highlight, then click to hear them read aloud."
            ].map((content, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: isSpeaking && activeElement?.textContent === content ? 0.9 : 1,
                  scale: isSpeaking && activeElement?.textContent === content ? 0.98 : 1,
                }}
                whileHover={settings.reducedMotion ? {} : {
                  y: -2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  scale: 1.02
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1.5rem',
                  background: 'var(--background)',
                  borderRadius: '12px',
                  border: '2px solid var(--border)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}
                onClick={(e) => handleElementClick(e, content)}
                aria-label={`Click to hear: ${content.substring(0, 30)}...`}
                role="button"
                tabIndex="0"
              >
                <p style={{
                  color: 'var(--text)',
                  lineHeight: '1.6',
                  position: 'relative'
                }}>
                  {content}
                  <span style={{
                    position: 'absolute',
                    right: '-10px',
                    bottom: '-10px',
                    fontSize: '1.2rem'
                  }}>
                    🔈
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TextToSpeechAndClickToRead;