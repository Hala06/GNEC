import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const CursorHighlighter = () => {
  const { settings } = useAccessibility();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
      
      // Detect hovered element
      const element = document.elementFromPoint(e.clientX, e.clientY);
      setHoveredElement(element);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const cursorSize = {
    small: 24,
    medium: 32,
    large: 48
  }[settings.cursor.size];

  const isInteractive = hoveredElement?.closest('button, a, [role="button"], [tabindex]');

  return (
    <motion.div
      className="cursor-highlighter"
      animate={{
        x: position.x - cursorSize / 2,
        y: position.y - cursorSize / 2,
        scale: clicked ? 0.8 : isInteractive ? 1.2 : 1,
        opacity: visible ? 1 : 0,
        backgroundColor: isInteractive ? `${settings.cursor.color}30` : 'transparent'
      }}
      transition={{ 
        type: 'spring', 
        damping: 20, 
        stiffness: 300,
        scale: { duration: 0.15 }
      }}
      style={{
        position: 'fixed',
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        borderRadius: settings.cursor.shape === 'circle' ? '50%' : 
                     settings.cursor.shape === 'pointer' ? '0% 50% 50% 50%' : '4px',
        border: `2px solid ${settings.cursor.color}`,
        pointerEvents: 'none',
        zIndex: 9999,
        transformOrigin: 'center',
        backdropFilter: 'blur(1px)',
        transform: isInteractive ? 'rotate(45deg)' : 'rotate(0deg)'
      }}
    />
  );
};

export default CursorHighlighter;