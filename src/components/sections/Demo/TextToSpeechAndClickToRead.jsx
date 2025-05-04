import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import CTAButton from '../../../components/core/Buttons/CTAButton';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

const TextToSpeechAndClickToRead = () => {
  const { settings, updateSetting } = useAccessibility();
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const loadVoices = useCallback(() => {
    const availableVoices = synth.getVoices();
    setVoices(availableVoices);
    
    if (availableVoices.length > 0 && !selectedVoice) {
      const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
      setSelectedVoice(defaultVoice.voiceURI);
      updateSetting('speech', { 
        ...settings.speech, 
        voice: defaultVoice 
      });
    }
  }, [synth, selectedVoice, settings.speech, updateSetting]);

  useEffect(() => {
    synth.addEventListener('voiceschanged', loadVoices);
    loadVoices();
    return () => synth.removeEventListener('voiceschanged', loadVoices);
  }, [loadVoices, synth]);

  const handleSpeak = (content) => {
    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(content || text);
    utterance.voice = voices.find(v => v.voiceURI === selectedVoice);
    utterance.lang = language;
    utterance.rate = settings.speech.rate;
    utterance.pitch = settings.speech.pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  const handleVoiceChange = (e) => {
    const voiceURI = e.target.value;
    setSelectedVoice(voiceURI);
    const voice = voices.find(v => v.voiceURI === voiceURI);
    updateSetting('speech', { 
      ...settings.speech, 
      voice: voice 
    });
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    const voiceForLang = voices.find(v => v.lang === lang) || voices[0];
    setSelectedVoice(voiceForLang?.voiceURI || '');
  };

  return (
    <motion.section
      id="text-to-speech"
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
    >
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: 'var(--text)'
        }}>
          Interactive Reader
        </h2>
        <p style={{
          color: 'var(--text)',
          opacity: 0.8,
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Click or tap on any text box to hear it read aloud. The boxes will remain visible while reading.
          Move your cursor away from a box to stop reading. Use the controls panel to adjust voice and speed settings.
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
        >
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
              onChange={handleLanguageChange}
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
              <option value="ar-SA">Arabic</option>
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

          <CTAButton
            text={isSpeaking ? 'Stop Reading' : 'Read Text'}
            onClick={() => isSpeaking ? synth.cancel() : handleSpeak()}
            variant={isSpeaking ? 'secondary' : 'primary'}
            fullWidth
            disabled={!text && !isSpeaking}
            ariaLabel={isSpeaking ? 'Stop reading' : 'Read text aloud'}
          />
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
          <label htmlFor="text-input" style={{
            display: 'block',
            marginBottom: '1rem',
            fontWeight: '600',
            color: 'var(--text)'
          }}>
            Enter text to read:
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid var(--border)',
              background: 'var(--background)',
              color: 'var(--text)',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}
            aria-label="Text input for speech synthesis"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {['Welcome message', 'Quick help', 'Tutorial'].map((title, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: isSpeaking ? 0.7 : 1,
                  scale: isSpeaking ? 0.98 : 1,
                }}
                whileHover={settings.reducedMotion ? {} : {
                  y: -2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  scale: 1.02,
                  borderColor: 'var(--accent)'
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1.5rem',
                  background: 'var(--background)',
                  borderRadius: '12px',
                  border: '2px solid var(--border)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleSpeak(title)}
                aria-label={`Click to hear: ${title}`}
                role="button"
                tabIndex="0"
              >
                <h3 style={{ 
                  marginBottom: '1rem', 
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {isSpeaking && (
                    <span role="img" aria-label="Speaking" style={{ fontSize: '1rem' }}>
                      🔊
                    </span>
                  )}
                  {title}
                </h3>
                <p style={{ 
                  color: 'var(--text)', 
                  opacity: 0.8,
                  position: 'relative'
                }}>
                  <span style={{ 
                    position: 'absolute',
                    right: '-10px',
                    bottom: '-10px',
                    fontSize: '1.2rem'
                  }}>
                    🔈
                  </span>
                  Click to hear this section read aloud
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
