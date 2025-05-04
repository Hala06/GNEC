import { motion } from 'framer-motion';
import CTAButton from '../../../components/core/Buttons/CTAButton';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

const About = () => {
  const { settings } = useAccessibility();

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ 
        duration: settings.reducedMotion ? 0 : 0.6, 
        ease: 'easeOut' 
      }}
      style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        background: 'var(--background)',
        maxWidth: '1200px',
        margin: '4rem auto',
        position: 'relative',
        borderRadius: '24px',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 32px rgba(var(--text-rgb), 0.05)'
      }}
    >
      <motion.h2
        style={{
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, var(--accent), var(--hover))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}
      >
        About GNEC
      </motion.h2>

      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto' 
      }}>
        <motion.p
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            marginBottom: '2rem',
            color: 'var(--text)',
            position: 'relative',
            padding: '2rem',
            background: 'var(--secondary)',
            borderRadius: '16px'
          }}
          whileHover={settings.reducedMotion ? {} : { y: -5 }}
        >
          GNEC is revolutionizing web accessibility by creating intuitive tools that make
          browsing seamless for users of all abilities. Our mission is to break down
          digital barriers through innovative solutions.
        </motion.p>

        <motion.div
          style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <CTAButton 
            text="Meet the Team" 
            variant="secondary" 
            ariaLabel="Learn more about our team"
          />
          <CTAButton 
            text="View Timeline" 
            variant="outline" 
            ariaLabel="View our development timeline"
          />
        </motion.div>

        <motion.p
          style={{
            marginTop: '3rem',
            opacity: 0.8,
            fontSize: '1rem',
            color: 'var(--text)'
          }}
        >
          Built with <span aria-label="love">❤️</span> at the GNEC Hackathon 2025
        </motion.p>
      </div>
    </motion.section>
  );
};

export default About;