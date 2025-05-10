import { motion } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const BackgroundBlobs = () => {
  const { settings } = useAccessibility();
 
  const colors = settings.theme === 'dark' 
    ? [
        'rgba(168, 216, 185, 0.45)', // Mint
        'rgba(255, 182, 193, 0.45)', // Pink
        'rgba(139, 135, 216, 0.45)'  // Purple
      ]
    : [
        'rgba(255, 223, 186, 0.2)',  // Light peach
        'rgba(221, 214, 255, 0.2)',  // Lavender
        'rgba(204, 255, 230, 0.2)'   // Mint
      ];

  const blobVariants = {
    animate: (i) => ({
      x: settings.reducedMotion ? 0 : [
        0,
        i % 2 === 0 ? 100 : -100,
        i % 3 === 0 ? -60 : 60,
        0
      ],
      y: settings.reducedMotion ? 0 : [
        0,
        i % 3 === 0 ? 60 : -60,
        i % 2 === 0 ? -80 : 80,
        0
      ],
      scale: settings.reducedMotion ? 1 : [1, 1.3, 0.8, 1],
      opacity: settings.theme === 'dark' ? [0.5, 0.8, 0.5, 0.8] : [0.4, 0.6, 0.3, 0.4],
      transition: {
        duration: 15 + i * 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: "easeInOut"
      }
    })
  };

  const blobs = settings.reducedMotion 
    ? [
        { size: 450, color: colors[1], x: '50%', y: '30%' },
        { size: 400, color: colors[2], x: '30%', y: '70%' }
      ]
    : [
        { size: 400, color: colors[0], x: '10%', y: '10%' },
        { size: 500, color: colors[1], x: '80%', y: '30%' },
        { size: 450, color: colors[2], x: '30%', y: '70%' },
        { size: 350, color: colors[0], x: '70%', y: '80%' }
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
      pointerEvents: 'none',
      opacity: settings.theme === 'dark' ? 0.8 : 0.6
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
            filter: 'blur(40px)',
            left: blob.x,
            top: blob.y,
            mixBlendMode: settings.theme === 'dark' ? 'screen' : 'soft-light',
            willChange: 'transform'
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default BackgroundBlobs;
