import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function ClickToRead() {
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [language, setLanguage] = useState('en-US')

  useEffect(() => {
    const synth = window.speechSynthesis
    const getVoices = () => setVoices(synth.getVoices())
    getVoices()
    synth.onvoiceschanged = getVoices
  }, [])

  const handleClick = (e) => {
    const utterance = new SpeechSynthesisUtterance(e.target.innerText)
    utterance.voice = voices.find(v => v.voiceURI === selectedVoice)
    utterance.lang = language
    speechSynthesis.speak(utterance)
  }

  return (
    <motion.section 
      id="click"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={styles.click}
    >
      <motion.h2 
        style={styles.heading}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Click-to-Read Demonstration
      </motion.h2>
      
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

      <div style={styles.container}>
        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          style={styles.card}
        >
          <motion.p onClick={handleClick} style={styles.clickText}>
            Click here to experience accessible reading technology.
          </motion.p>
          <motion.div 
            style={styles.icon}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            🔊
          </motion.div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          style={styles.card}
        >
          <motion.p onClick={handleClick} style={styles.clickText}>
            Making web content accessible for everyone.
          </motion.p>
          <motion.div 
            style={styles.icon}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.8, ease: "easeInOut" }}
          >
            🔊
          </motion.div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          style={styles.card}
        >
          <motion.p onClick={handleClick} style={styles.clickText}>
            Breaking barriers with innovative solutions.
          </motion.p>
          <motion.div 
            style={styles.icon}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 1.6, ease: "easeInOut" }}
          >
            🔊
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

const styles = {
  click: {
    padding: '6rem 2rem',
    textAlign: 'center',
    background: 'var(--background)',
    borderRadius: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    background: 'linear-gradient(135deg, var(--accent), var(--hover))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  controls: {
    display: 'flex',
    gap: '2.5rem',
    justifyContent: 'center',
    marginBottom: '4rem',
    flexWrap: 'wrap',
    padding: '0 1rem',
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
    padding: '1.25rem 2rem',
    fontSize: '1.2rem',
    borderRadius: '12px',
    border: '2px solid var(--border)',
    background: 'var(--secondary)',
    color: 'var(--text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '260px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    '&:focus': {
      borderColor: 'var(--accent)',
      boxShadow: '0 0 0 3px var(--accent)',
    },
    '&:hover': {
      borderColor: 'var(--hover)',
    }
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  card: {
    position: 'relative',
    padding: '3rem',
    borderRadius: '16px',
    background: 'var(--secondary)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    border: '2px solid var(--border)',
    margin: '0.5rem',
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--accent)',
      boxShadow: '0 0 0 3px var(--accent)',
    },
    '&:focus-visible': {
      outline: '3px solid var(--hover)',
      outlineOffset: '2px',
    },
    '&:hover': {
      borderColor: 'var(--accent)',
    }
  },
  clickText: {
    fontSize: '1.4rem',
    color: 'var(--text)',
    margin: 0,
    fontWeight: '600',
    lineHeight: '1.8',
    letterSpacing: '0.02em',
    maxWidth: '80%',
  },
  icon: {
    fontSize: '1.8rem',
    opacity: '0.9',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
  },
}

export default ClickToRead
