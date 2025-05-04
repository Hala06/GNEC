import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const CursorHighlighter = () => {
  const { settings } = useAccessibility();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
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
    small: 30,
    medium: 40,
    large: 50
  }[settings.cursor.size];

  return (
    <motion.div
      className="cursor-highlighter"
      animate={{
        x: position.x - cursorSize / 2,
        y: position.y - cursorSize / 2,
        scale: clicked ? 0.9 : 1,
        opacity: visible ? 1 : 0
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{
        position: 'fixed',
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        borderRadius: settings.cursor.shape === 'circle' ? '50%' : '4px',
        backgroundColor: 'transparent',
        border: `2px solid ${settings.cursor.color}`,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transformOrigin: 'center'
      }}
    />
  );
};

export default CursorHighlighter;
