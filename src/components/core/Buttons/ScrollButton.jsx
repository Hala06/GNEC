import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const ScrollButton = ({ containerRef }) => {
  const { settings } = useAccessibility();
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState('up');
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setDirection(currentScroll > lastScroll ? 'down' : 'up');
      setVisible(
        currentScroll > 300 &&
        currentScroll < document.body.scrollHeight - window.innerHeight - 100
      );
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const scrollTo = () => {
    window.scrollTo({
      top: direction === 'up' ? 0 : document.body.scrollHeight,
      behavior: settings.reducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-button"
          onClick={scrollTo}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: settings.reducedMotion ? 0 : 0.3 }
          }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: settings.reducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="scroll-to-button"
          aria-label={direction === 'up' ? 'Scroll to top' : 'Scroll to bottom'}
          style={{
            position: 'fixed',
            bottom: '5rem', // Moved up to avoid overlap
            right: '2rem',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            background: 'var(--accent)',
            color: 'var(--background)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            zIndex: 100,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {direction === 'up' ? '↑' : '↓'}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton;