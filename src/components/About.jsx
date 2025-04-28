import { motion } from 'framer-motion'

function About() {
  return (
    <motion.section 
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={styles.about}
    >
      <h2 style={styles.heading}>About GNEC</h2>
      <p style={styles.text}>
        GNEC is building a future where browsing the web is seamless and inclusive for all users, regardless of their abilities.
      </p>
      <p style={styles.text}>
        Built with ❤️ at the GNEC Hackathon 2025.
      </p>
    </motion.section>
  )
}

const styles = {
  about: {
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
  text: {
    fontSize: '1.3rem',
    color: 'var(--text)',
    maxWidth: '800px',
    margin: '0 auto 2rem',
    lineHeight: '1.7',
    letterSpacing: '0.02em',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '0 1rem',
  }
}

export default About
