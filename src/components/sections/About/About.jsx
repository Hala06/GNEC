import { motion } from 'framer-motion';
import CTAButton from '../../../components/core/Buttons/CTAButton';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import beforeAfterImage from '/assets/images/B-A.jpg';

const About = () => {
  const navigate = useNavigate();
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
        About AccessEd
      </motion.h2>

      <div style={{
        display: 'flex',
        flexDirection: settings.reducedMotion ? 'column' : 'row',
        gap: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <motion.div
          style={{
            flex: 1,
            minWidth: '300px',
            maxWidth: '500px'
          }}
          whileHover={settings.reducedMotion ? {} : { y: -5 }}
        >
          <img
            src={beforeAfterImage}
            alt="Before/After using AccessEd: Left shows frustrated user, right shows happy user with accessibility features"
            style={{
              width: '100%',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              border: '2px solid var(--border)'
            }}
          />
        </motion.div>

        <motion.div
          style={{
            flex: 1,
            minWidth: '300px',
            maxWidth: '600px',
            textAlign: 'left'
          }}
        >
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
            AccessEd is revolutionizing web accessibility by creating intuitive tools that make
            browsing seamless for users of all abilities. Our mission is to break down
            digital barriers through innovative solutions that empower everyone to access
            information effortlessly.
          </motion.p>

          <motion.div
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <CTAButton
              text="Try Demo"
              onClick={() => document.querySelector('#demo')?.scrollIntoView({ 
                behavior: settings.reducedMotion ? 'auto' : 'smooth' 
              })}
              ariaLabel="Try our accessibility demo"
            />
            <CTAButton
              text="Get Extension"
              variant="outline"
              onClick={() => window.open('https://github.com/ket3l4/AccessEd', '_blank')}
              ariaLabel="Get the AccessEd browser extension"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.p
        style={{
          marginTop: '3rem',
          opacity: 0.8,
          fontSize: '1rem',
          color: 'var(--text)'
        }}
      >
        Built with <span aria-label="love">❤️</span> to make the web accessible for everyone
      </motion.p>
    </motion.section>
  );
};

export default About;