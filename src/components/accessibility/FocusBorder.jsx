import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FocusBorder = () => {
  const [activeElement, setActiveElement] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 });

  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') {
        setActiveElement(e.target);
        const rect = e.target.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
          x: rect.left,
          y: rect.top
        });
      }
    };

    const handleBlur = () => setActiveElement(null);

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  return (
    <motion.div
      className="focus-border"
      animate={{
        x: dimensions.x - 4,
        y: dimensions.y - 4,
        width: dimensions.width + 8,
        height: dimensions.height + 8,
        opacity: activeElement ? 1 : 0
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{
        position: 'fixed',
        borderRadius: '8px',
        border: '3px solid var(--focus-color, #FF5722)',
        pointerEvents: 'none',
        zIndex: 9998,
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8)'
      }}
    />
  );
};

export default FocusBorder;