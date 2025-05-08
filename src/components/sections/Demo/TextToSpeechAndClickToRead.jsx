import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import CTAButton from '../../../components/core/Buttons/CTAButton';

const TextToSpeechAndClickToRead = () => {
  const { settings, updateSetting } = useAccessibility();
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const synthRef = useRef(null);

  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis?.getVoices() || [];
    setVoices(availableVoices);
   
    if (availableVoices.length > 0 && !selectedVoice) {
      // Try to find English male voice first, then default, then first available
      const defaultVoice = availableVoices.find(v => 
        v.lang.includes('en-') && v.name.toLowerCase().includes('male')
      ) || availableVoices.find(v => v.default) || availableVoices[0];
      
      setSelectedVoice(defaultVoice.voiceURI);
      updateSetting('speech', {
        ...settings.speech,
        voice: defaultVoice,
        rate: 0.8 // Set default rate to 0.8
      });
    }
  }, [selectedVoice, settings.speech, updateSetting]);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    const handleVoicesChanged = () => {
      loadVoices();
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    loadVoices();

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      if (synthRef.current?.speaking) {
        synthRef.current.cancel();
      }
    };
  }, [loadVoices]);

  const handleSpeak = (content) => {
    // Allow stopping even when screen reader is inactive
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    
    // Only start new speech if screen reader is active and we have content
    if (!content || !settings.isScreenReaderActive) return;
    
    if (synthRef.current?.speaking) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.voice = voices.find(v => v.voiceURI === selectedVoice) || settings.speech.voice;
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
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
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

  const stopSpeaking = () => {
    if (synthRef.current?.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      if (activeElement) {
        activeElement.style.backgroundColor = '';
      }
    }
  };

  const handleVoiceChange = (e) => {
    const voiceURI = e.target.value;
    setSelectedVoice(voiceURI);
    const voice = voices.find(v => v.voiceURI === voiceURI);
    if (voice) {
      updateSetting('speech', { ...settings.speech, voice });
    }
  };

  const sampleContent = [
    "AccessEd helps make the web accessible to everyone with features like text-to-speech, focus highlighting, and customizable cursors.",
    "Our mission is to break down digital barriers and create an inclusive browsing experience for users of all abilities.",
    "Try hovering over interactive elements to see them highlight, then click to hear them read aloud."
  ];

  return (
    <motion.section
      id="demo"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: settings.reducedMotion ? 0 : 0.6 }}
      style={{
        padding: '6rem 2rem',
        background: 'var(--background)',
        maxWidth: '1200px',
        margin: '4rem auto',
        borderRadius: '24px',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 32px rgba(var(--text-rgb), 0.05)'
      }}
      aria-labelledby="demo-heading"
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 id="demo-heading" style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, var(--accent), var(--hover))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
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
          <strong>How to use:</strong> Click on any text element to hear it read aloud. 
          The element will highlight while reading. Double-click interactive elements 
          to activate them. Use the controls to adjust voice and speed settings.
        </p>

        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'var(--secondary)',
              padding: '1.5rem',
              borderRadius: '12px',
              margin: '2rem auto',
              borderLeft: '4px solid var(--accent)',
              maxWidth: '800px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ 
                background: 'var(--accent)',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                !
              </span>
              <h3 style={{ margin: 0, color: 'var(--accent)' }}>Quick Tip</h3>
            </div>
            <p style={{ margin: '0.5rem 0 1rem 0' }}>
              Press the 🔊 button in the bottom right to toggle screen reader mode.
              When active, click any text to hear it read aloud. Adjust voice and
              speed settings using the controls panel.
            </p>
            <CTAButton
              text="Got it!"
              variant="outline"
              onClick={() => setShowInstructions(false)}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            />
          </motion.div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '2rem',
        alignItems: 'start',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        {/* Controls Panel */}
        <motion.div
          style={{
            padding: '2rem',
            background: 'var(--secondary)',
            borderRadius: '16px',
            position: 'sticky',
            top: '100px',
            border: '1px solid var(--border)'
          }}
          whileHover={settings.reducedMotion ? {} : { y: -5 }}
        >
          <h3 style={{ 
            marginBottom: '1.5rem', 
            color: 'var(--accent)',
            fontSize: '1.5rem'
          }}>
            Reader Settings
          </h3>
         
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
                color: 'var(--text)',
                fontSize: '1rem'
              }}
              aria-label="Select language"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
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
              onChange={handleVoiceChange}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '2px solid var(--border)',
                background: 'var(--background)',
                color: 'var(--text)',
                fontSize: '1rem'
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
                accentColor: 'var(--accent)',
                height: '8px',
                borderRadius: '4px'
              }}
              aria-label="Adjust speech rate"
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0.5rem',
              fontSize: '0.9rem',
              color: 'var(--text)',
              opacity: 0.7
            }}>
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => isSpeaking ? stopSpeaking() : handleSpeak(text)}
              disabled={!text && !isSpeaking}
              aria-label={isSpeaking ? 'Stop reading' : 'Read text aloud'}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '8px',
                background: isSpeaking ? 'var(--error)' : 'var(--accent)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
              opacity: (!text && !isSpeaking) ? 0.6 : 1
              }}
            >
              {isSpeaking ? '⏹ Stop' : '▶ Read'}
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          style={{
            padding: '2rem',
            background: 'var(--secondary)',
            borderRadius: '16px',
            minHeight: '400px',
            border: '1px solid var(--border)'
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="text-input" style={{
              display: 'block',
              marginBottom: '1rem',
              fontWeight: '600',
              color: 'var(--text)',
              fontSize: '1.1rem'
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
                lineHeight: '1.6',
                resize: 'vertical'
              }}
              aria-label="Text input for speech synthesis"
              onClick={(e) => handleElementClick(e, text)}
            />
          </div>

          <h3 style={{ 
            marginBottom: '1.5rem', 
            color: 'var(--accent)',
            fontSize: '1.5rem'
          }}>
            Sample Content
          </h3>
         
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {sampleContent.map((content, index) => (
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
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onClick={(e) => handleElementClick(e, content)}
                aria-label={`Click to hear: ${content.substring(0, 30)}...`}
                role="button"
                tabIndex="0"
              >
                <p style={{
                  color: 'var(--text)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {content}
                </p>
                <div style={{
                  position: 'absolute',
                  right: '1rem',
                  bottom: '1rem',
                  width: '24px',
                  height: '24px',
                  background: 'rgba(var(--accent-rgb), 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '0.9rem' }}>🔈</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TextToSpeechAndClickToRead;
