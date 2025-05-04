import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const FocusBorder = () => {
  const { settings } = useAccessibility();
  const [activeElement, setActiveElement] = useState(null);
  const [dimensions, setDimensions] = useState({ 
    width: 0, 
    height: 0, 
    x: 0, 
    y: 0 
  });

  useEffect(() => {
    const handleFocus = (e) => {
      const focusableElements = [
        'BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 
        '[role="button"]', '[role="link"]', '[tabindex]'
      ];
      
      if (focusableElements.some(selector => 
        e.target.matches(selector) || 
        e.target.closest(selector)
      )) {
        const element = e.target.closest(focusableElements.join(',')) || e.target;
        setActiveElement(element);
        const rect = element.getBoundingClientRect();
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
        borderRadius: '6px',
        border: `2px solid ${settings.highlight.color}`,
        pointerEvents: 'none',
        zIndex: 9998,
        boxShadow: `0 0 0 2px ${settings.highlight.color}20`
      }}
    />
  );
};

export default FocusBorder;
