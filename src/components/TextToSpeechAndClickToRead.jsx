import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TextToSpeechAndClickToRead() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [userText, setUserText] = useState('Welcome to this page!');

  useEffect(() => {
    const synth = window.speechSynthesis;
    const getVoices = () => setVoices(synth.getVoices());
    getVoices();
    synth.onvoiceschanged = getVoices;
  }, []);

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find((v) => v.voiceURI === selectedVoice);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  };

  return (
    <motion.section 
      id="text-to-speech-click-to-read"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={styles.container}
    >
      <section id="demo" style={styles.demoSection}>
        <h2 style={styles.demoTitle}>
          Interactive Demo
        </h2>
        <div style={styles.controls}>
          <div style={styles.controlGroup}>
            <label htmlFor="language" style={styles.label}>Select Language:</label>
            <select 
              id="language"
              value={language} 
              onChange={(e) => setLanguage(e.target.value)} 
              style={styles.select}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="fr-FR">French</option>
              <option value="es-ES">Spanish</option>
              <option value="ar-SA">Arabic</option>
            </select>
          </div>

          <div style={styles.controlGroup}>
            <label htmlFor="voice" style={styles.label}>Select Voice:</label>
            <select 
              id="voice"
              value={selectedVoice} 
              onChange={(e) => setSelectedVoice(e.target.value)} 
              style={styles.select}
            >
              {voices.map((voice, idx) => (
                <option key={idx} value={voice.voiceURI}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.contentArea}>
          <textarea
            placeholder="Type text here..."
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            style={styles.textarea}
          />

          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            style={styles.triangleButton}
            onClick={() => handleSpeak(userText)}
          >
            🔊
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            style={styles.clickToRead}
            onClick={() => handleSpeak(userText)}
          >
            {userText}
          </motion.div>
        </div>
      </section>
    </motion.section>
  );
}

const styles = {
  container: {
    padding: '4rem 2rem',
    textAlign: 'center',
    background: 'var(--background)',
    borderRadius: '16px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  demoSection: {
    padding: '2rem 1rem',
    background: 'var(--gradient-primary)',
  },
  demoTitle: {
    textAlign: 'center',
    background: 'var(--gradient-accent)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  controls: {
    display: 'flex',
    gap: '2.5rem',
    justifyContent: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  label: {
    fontSize: '1.1rem',
    color: 'var(--text)',
    fontWeight: '600',
    letterSpacing: '0.02em',
  },
  select: {
    padding: '1rem 1.5rem',
    fontSize: '1.2rem',
    borderRadius: '12px',
    border: '2px solid var(--border)',
    background: 'var(--secondary)',
    color: 'var(--text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '200px',
  },
  contentArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  textarea: {
    width: '100%',
    maxWidth: '400px',
    minHeight: '120px',
    fontSize: '1.2rem',
    padding: '1rem',
    borderRadius: '12px',
    border: '2px solid var(--border)',
    background: 'var(--secondary)',
    color: 'var(--text)',
    resize: 'vertical',
  },
  triangleButton: {
    width: '60px',
    height: '60px',
    background: 'var(--accent)',
    color: 'var(--background)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  clickToRead: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    borderRadius: '12px',
    background: 'var(--secondary)',
    color: 'var(--text)',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

export default TextToSpeechAndClickToRead;