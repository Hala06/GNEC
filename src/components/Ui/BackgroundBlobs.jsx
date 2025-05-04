import { motion } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const BackgroundBlobs = () => {
  const { settings } = useAccessibility();
  
  const blobVariants = {
    animate: (i) => ({
      x: settings.reducedMotion ? 0 : [0, i % 2 === 0 ? 100 : -100, 0],
      y: settings.reducedMotion ? 0 : [0, i % 3 === 0 ? 50 : -50, 0],
      scale: settings.reducedMotion ? 1 : [1, 1.1, 1],
      transition: {
        duration: 20 + i * 5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    })
  };

  const blobs = [
    { size: 300, color: 'var(--blob-1)', x: '20%', y: '10%' },
    { size: 400, color: 'var(--blob-2)', x: '70%', y: '50%' },
    { size: 350, color: 'var(--blob-3)', x: '30%', y: '70%' },
    { size: 250, color: 'var(--blob-1)', x: '80%', y: '20%' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={blobVariants}
          initial="initial"
          animate="animate"
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: blob.color,
            filter: 'blur(60px)',
            opacity: 0.3,
            left: blob.x,
            top: blob.y,
            mixBlendMode: 'soft-light'
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default BackgroundBlobs;
