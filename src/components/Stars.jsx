import { motion } from 'framer-motion';

const Star = ({ x, y, size, delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: 'var(--accent)',
      borderRadius: '50%',
      boxShadow: '0 0 10px var(--accent)',
    }}
    initial={{ opacity: 0.2, scale: 0.5 }}
    animate={{ 
      opacity: [0.2, 1, 0.2],
      scale: [0.5, 1.2, 0.5],
    }}
    transition={{
      duration: 4,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const Stars = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 4
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
      opacity: 0.7
    }}>
      {stars.map((star, i) => (
        <Star key={i} {...star} />
      ))}
    </div>
  );
};

export default Stars;
