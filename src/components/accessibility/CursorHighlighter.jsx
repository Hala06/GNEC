import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorHighlighter = () => {
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

  return (
    <motion.div
      className="cursor-highlighter"
      animate={{
        x: position.x - 20,
        y: position.y - 20,
        scale: clicked ? 0.8 : 1,
        opacity: visible ? 1 : 0
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{
        position: 'fixed',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--cursor-color, rgba(74, 144, 168, 0.3))',
        border: '2px solid var(--cursor-border, #4A90A8)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference'
      }}
    />
  );
};

export default CursorHighlighter;