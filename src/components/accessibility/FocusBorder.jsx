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
        'button', 'a', 'input', 'select', 'textarea',
        '[role="button"]', '[role="link"]', '[tabindex]:not([tabindex="-1"])'
      ].join(',');
      
      const element = e.target.closest(focusableElements) || e.target;
      
      if (element && focusableElements.includes(element.tagName.toLowerCase())) {
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
        x: dimensions.x - 6,
        y: dimensions.y - 6,
        width: dimensions.width + 12,
        height: dimensions.height + 12,
        opacity: activeElement ? 1 : 0,
        scale: activeElement ? 1 : 0.9
      }}
      transition={{ 
        type: 'spring', 
        damping: 25, 
        stiffness: 400,
        opacity: { duration: 0.2 }
      }}
      style={{
        position: 'fixed',
        borderRadius: '8px',
        border: `3px solid ${settings.highlight.color}`,
        pointerEvents: 'none',
        zIndex: 9998,
        boxShadow: `0 0 0 2px ${settings.highlight.color}20`,
        background: `${settings.highlight.color}10`,
        transformOrigin: 'center'
      }}
    />
  );
};

export default FocusBorder; 