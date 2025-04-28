import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import elderlyImage from '../assets/elderly.jpg'

function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} id="hero" style={styles.hero}>
      <div style={styles.container}>
        
        {/* Background Glow */}
        <motion.div
          style={styles.glow}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Left - Parallax Text */}
        <motion.div
          style={{
            ...styles.textContainer,
            y,
            opacity
          }}
          animate={{ y: [-5, 5, -5] }}
          transition={{
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <h1 style={styles.heading}>Empowering Accessibility for All</h1>
          <p style={styles.subheading}>
            Helping every user enjoy the web — without barriers.
          </p>
          <div style={styles.buttons}>
            <a href="#demo" style={styles.buttonPrimary}>Try Demo</a>
            <a href="https://github.com/ket3l4/Listen-Up" target="_blank" style={styles.buttonSecondary}>Download Extension</a>
          </div>
        </motion.div>

        {/* Right - Static Image */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          style={styles.imageContainer}
        >
          <img 
            src={elderlyImage} 
            alt="Elderly couple using a tablet" 
            style={styles.image}
          />
        </motion.div>

      </div>
    </section>
  )
}

const styles = {
  hero: {
    minHeight: '92vh',
    background: 'var(--background)',
    padding: '4rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginTop: '-2rem',
    boxShadow: 'none',
  },
  glow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 70%)',
    filter: 'blur(150px)',
    opacity: 0.3,
    zIndex: 0,
    left: '0',
    top: '0',
    pointerEvents: 'none',
    transform: 'translateZ(0)',
    mixBlendMode: 'soft-light',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    width: '100%',
    gap: '2rem',
    flexWrap: 'wrap',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1
  },
  textContainer: {
    flex: '1',
    minWidth: '300px'
  },
  heading: {
    fontSize: '3.5rem',
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, var(--accent), var(--hover))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.2',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: -10,
      background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)',
      filter: 'blur(20px)',
      opacity: 0.15,
      zIndex: -1,
      pointerEvents: 'none',
    }
  },
  subheading: {
    fontSize: '1.4rem',
    marginBottom: '2.5rem',
    color: 'var(--text)',
    lineHeight: '1.6',
    letterSpacing: '0.02em',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  buttonPrimary: {
    padding: '1.25rem 2.5rem',
    background: 'linear-gradient(135deg, var(--accent), var(--hover))',
    color: 'var(--background)',
    borderRadius: '16px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    letterSpacing: '0.02em',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '1px solid var(--border)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
    '&:focus': {
      outline: '3px solid var(--hover)',
      outlineOffset: '2px',
    },
  },
  buttonSecondary: {
    padding: '1.25rem 2.5rem',
    background: 'linear-gradient(145deg, var(--secondary), var(--accent))',
    color: 'var(--text)',
    borderRadius: '16px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    letterSpacing: '0.02em',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '1px solid var(--border)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
    '&:focus': {
      outline: '3px solid var(--hover)',
      outlineOffset: '2px',
    },
  },
  imageContainer: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    maxWidth: '450px',
    height: 'auto',
    borderRadius: '24px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
    border: '2px solid var(--border)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.02) translateY(-8px)',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.25)',
    }
  }
}

export default HeroSection
