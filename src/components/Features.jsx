import { motion } from 'framer-motion'

const featureData = [
  { title: "Text-to-Speech", description: "Reads text aloud for easier browsing." },
  { title: "Highlighted Widgets", description: "Hovering highlights links and buttons." },
  { title: "Custom Cursor", description: "Enlarged cursors for easier visibility." },
  { title: "Hover-to-Read", description: "Hover over text to hear it instantly." },
]

function Features() {
  return (
    <motion.section 
      id="features"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={styles.features}
    >
      <h2 style={styles.heading}>Features</h2>
      <div style={styles.grid}>
        {featureData.map((feature, idx) => (
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            key={idx}
            style={styles.card}
          >
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardText}>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

const styles = {
  features: {
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
  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    marginTop: '2rem',
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    flex: '1',
    minWidth: '240px',
    maxWidth: '280px',
    background: 'var(--secondary)',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    color: 'var(--text)',
    border: '2px solid var(--border)',
    margin: '0.5rem',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      borderColor: 'var(--accent)',
    },
    '&:focus': {
      outline: '3px solid var(--accent)',
      outlineOffset: '2px',
    }
  },
  cardTitle: {
    fontSize: '1.4rem',
    marginBottom: '1rem',
    fontWeight: '600',
    letterSpacing: '0.02em',
    color: 'var(--accent)',
  },
  cardText: {
    fontSize: '1.2rem',
    lineHeight: '1.7',
    letterSpacing: '0.02em',
  }
}

export default Features
