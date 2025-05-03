import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState('up');
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setDirection(currentScroll > lastScroll ? 'down' : 'up');
      setVisible(currentScroll > 300 && currentScroll < document.body.scrollHeight - window.innerHeight - 100);
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const scrollTo = () => {
    window.scrollTo({
      top: direction === 'up' ? 0 : document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-button"
          onClick={scrollTo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="scroll-to-button"
          aria-label={direction === 'up' ? 'Scroll to top' : 'Scroll to bottom'}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            background: 'var(--accent)',
            color: 'var(--background)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
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