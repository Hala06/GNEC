import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import CTAButton from '../../../components/core/Buttons/CTAButton';

const TextToSpeechAndClickToRead = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const loadVoices = useCallback(() => {
    setVoices(synth.getVoices());
  }, [synth]);

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
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    synth.speak(utterance);
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
      <h2 style={{
        fontSize: '2.5rem',
        marginBottom: '3rem',
        textAlign: 'center',
        color: 'var(--text)'
      }}>
        Interactive Reader
      </h2>

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
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text)'
            }}>
              Language:
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '2px solid var(--border)',
                background: 'var(--background)'
              }}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="ar-SA">Arabic</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text)'
            }}>
              Voice:
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '2px solid var(--border)',
                background: 'var(--background)'
              }}
            >
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <CTAButton
            text={isSpeaking ? 'Stop Reading' : 'Read Text'}
            onClick={() => handleSpeak()}
            variant={isSpeaking ? 'secondary' : 'primary'}
            fullWidth
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
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or paste content here..."
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid var(--border)',
              background: 'var(--background)',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {['Welcome message', 'Quick help', 'Tutorial'].map((title, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '1.5rem',
                  background: 'var(--background)',
                  borderRadius: '12px',
                  border: '2px solid var(--border)',
                  cursor: 'pointer'
                }}
                onClick={() => handleSpeak(title)}
              >
                <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--text))', opacity: 0.8 }}>
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
