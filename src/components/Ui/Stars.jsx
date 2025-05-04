import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const Star = ({ x, y, size, delay, mouseX, mouseY, reducedMotion }) => {
  const distance = useMotionValue(0);
  const scale = useTransform(distance, [0, 0.5], [1, reducedMotion ? 1 : 1.5]);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e) => {
      const starX = x * window.innerWidth / 100;
      const starY = y * window.innerHeight / 100;
      const dist = Math.sqrt(Math.pow(e.clientX - starX, 2) + Math.pow(e.clientY - starY, 2)) / window.innerWidth;
      distance.set(dist);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, distance, reducedMotion]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: 'currentColor',
        borderRadius: '50%',
        scale,
        opacity: 0.8
      }}
      animate={reducedMotion ? {} : {
        opacity: [0.2, 0.8, 0.2],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{
        duration: reducedMotion ? 0 : 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      aria-hidden="true"
    />
  );
};

const Stars = () => {
  const { settings } = useAccessibility();
  const stars = Array.from({ length: settings.reducedMotion ? 10 : 40 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2
  }));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      color: 'var(--star-color)'
    }}>
      {stars.map((star, i) => (
        <Star 
          key={i} 
          {...star} 
          reducedMotion={settings.reducedMotion} 
        />
      ))}
    </div>
  );
};

export default Stars;
