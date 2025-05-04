import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import elderlyImage from '/assets/images/elderly.jpg';
import CTAButton from '../../../components/core/Buttons/CTAButton';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

const HeroSection = () => {
  const { settings } = useAccessibility();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", settings.reducedMotion ? "0%" : "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, settings.reducedMotion ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--gradient-primary)'
      }}
      aria-labelledby="hero-heading"
    >

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        width: '100%',
        padding: '2rem',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap',
        gap: '4rem'
      }}>
        <motion.div
          style={{
            flex: 1,
            minWidth: '300px',
            y,
            opacity
          }}
        >
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: settings.reducedMotion ? 0 : 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, var(--accent), var(--hover))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Web Accessibility <br />For Everyone
          </motion.h1>
         
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: settings.reducedMotion ? 0 : 0.6, delay: 0.4 }}
            style={{
              fontSize: '1.2rem',
              lineHeight: '1.6',
              marginBottom: '2.5rem',
              color: 'var(--text)',
              maxWidth: '600px'
            }}
          >
            Empowering users of all abilities with intuitive tools that make the web accessible,
            enjoyable, and barrier-free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: settings.reducedMotion ? 0 : 0.6, delay: 0.6 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <CTAButton 
              text="Try Demo" 
              href="#demo" 
              ariaLabel="Try our accessibility demo"
            />
            <CTAButton 
              text="Download" 
              variant="outline" 
              href="/download" 
              ariaLabel="Download the extension"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: settings.reducedMotion ? 0 : 0.6, delay: 0.4 }}
          style={{
            flex: 1,
            minWidth: '300px',
            position: 'relative'
          }}
        >
          <img
            src={elderlyImage}
            alt="Elderly woman using tablet with accessibility features"
            style={{
              width: '100%',
              maxWidth: '500px',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              border: '2px solid var(--border)'
            }}
          />
          <motion.div
            animate={settings.reducedMotion ? {} : {
              rotate: [0, 5, -5, 0],
              y: [0, 10, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              background: 'var(--accent)',
              color: 'white',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              zIndex: 2
            }}
            aria-hidden="true"
          >
            Try Now!
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
