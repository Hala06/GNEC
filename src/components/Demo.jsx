import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Demo() {
  const [text, setText] = useState('')
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [language, setLanguage] = useState('en-US')

  useEffect(() => {
    const synth = window.speechSynthesis
    const getVoices = () => setVoices(synth.getVoices())
    getVoices()
    synth.onvoiceschanged = getVoices
  }, [])

  const handleSpeak = () => {
    if (text.trim() !== '') {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = voices.find(v => v.voiceURI === selectedVoice)
      utterance.lang = language
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <motion.section 
      id="demo"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={styles.demo}
    >
      <h2 style={styles.heading}>Text-to-Speech Demo</h2>

      <textarea
        placeholder="Type text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
      />

      <div style={styles.selects}>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.select}>
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="fr-FR">French (FR)</option>
          <option value="es-ES">Spanish (ES)</option>
          <option value="ar-SA">Arabic (SA)</option>
        </select>

        <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)} style={styles.select}>
          {voices.map((voice, idx) => (
            <option key={idx} value={voice.voiceURI}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <motion.button 
        onClick={handleSpeak}
        whileHover={text.trim() ? { scale: 1.03, y: -4 } : {}}
        whileTap={text.trim() ? { scale: 0.97 } : {}}
        disabled={!text.trim()}
        style={{
          padding: '1.25rem 2.5rem',
          fontSize: '1.2rem',
          fontWeight: '600',
          borderRadius: '16px',
          background: text.trim() 
            ? 'linear-gradient(135deg, var(--accent), var(--hover))'
            : 'linear-gradient(145deg, var(--secondary), var(--border))',
          color: 'var(--background)',
          border: '1px solid var(--border)',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          outline: 'none',
          letterSpacing: '0.02em',
          opacity: text.trim() ? '1' : '0.7',
          transform: 'none',
          '&:disabled': {
            cursor: 'not-allowed',
          },
          '&:focus': {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 3px var(--accent)',
          },
          '&:focus-visible': {
            outline: '3px solid var(--hover)',
            outlineOffset: '2px',
          }
        }}
      >
        🔊 Play Text
      </motion.button>
    </motion.section>
  )
}

const styles = {
  demo: {
    padding: '6rem 2rem',
    textAlign: 'center',
    background: 'var(--background)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    background: 'linear-gradient(135deg, var(--accent), var(--hover))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  textarea: {
    width: '100%',
    maxWidth: '800px',
    minHeight: '180px',
    fontSize: '1.2rem',
    padding: '1.75rem',
    borderRadius: '20px',
    background: 'linear-gradient(145deg, var(--secondary), var(--accent))',
    border: '2px solid var(--border)',
    color: 'var(--text)',
    marginBottom: '2rem',
    resize: 'vertical',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    '&:focus': {
      borderColor: 'var(--hover)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 3px var(--accent)',
    },
    '&:hover': {
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    }
  },
  selects: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '2.5rem',
    padding: '0 1rem',
  },
  select: {
    padding: '1rem 1.75rem',
    fontSize: '1.1rem',
    borderRadius: '16px',
    border: '2px solid var(--border)',
    background: 'linear-gradient(145deg, var(--secondary), var(--accent))',
    color: 'var(--text)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: '220px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    '&:focus': {
      borderColor: 'var(--hover)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 3px var(--accent)',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    }
  }
}

export default Demo
