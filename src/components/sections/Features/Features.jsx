import { motion } from 'framer-motion';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

const features = [
  {
    title: "Smart Screen Reader",
    description: "Context-aware reading with adjustable speed and voice preferences",
    icon: "🔊",
    ariaLabel: "Smart screen reader feature"
  },
  {
    title: "Focus Highlighting",
    description: "Visual indicators for interactive elements with customizable colors",
    icon: "✨",
    ariaLabel: "Focus highlighting feature"
  },
  {
    title: "Customizable Cursor",
    description: "High-visibility cursors in multiple shapes and sizes",
    icon: "🖱️",
    ariaLabel: "Customizable cursor feature"
  },
  {
    title: "Text Magnifier",
    description: "Hover-to-zoom for difficult-to-read text elements",
    icon: "🔍",
    ariaLabel: "Text magnifier feature"
  },
  {
    title: "Dark/Light Mode",
    description: "Automatic theme switching based on system preferences",
    icon: "🌓",
    ariaLabel: "Dark and light mode feature"
  },
  {
    title: "Cross-Browser Support",
    description: "Works on Chrome, Firefox, and other major browsers",
    icon: "🌐",
    ariaLabel: "Cross-browser support feature"
  }
];

const Features = () => {
  const { settings } = useAccessibility();

  return (
    <motion.section
      id="features"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: settings.reducedMotion ? 0 : 0.6 }}
      style={{
        padding: '6rem 2rem',
        background: 'var(--background)',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-labelledby="features-heading"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.h2
          id="features-heading"
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--accent), var(--hover))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Key Features
        </motion.h2>

        <motion.p
          style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            color: 'var(--text)',
            opacity: 0.8
          }}
        >
          Designed for users of all abilities with customizable options
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{
                duration: settings.reducedMotion ? 0 : 0.5,
                delay: index * 0.1
              }}
              whileHover={settings.reducedMotion ? {} : { 
                y: -5,
                boxShadow: '0 8px 24px rgba(var(--text-rgb), 0.1)'
              }}
              style={{
                padding: '2rem',
                background: 'var(--secondary)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 20px rgba(var(--text-rgb), 0.05)',
                transition: 'all 0.3s ease'
              }}
              aria-label={feature.ariaLabel}
              tabIndex="0"
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                width: '60px',
                height: '60px',
                background: 'rgba(var(--accent-rgb), 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
                color: 'var(--accent)'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'var(--text)',
                opacity: 0.8,
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;