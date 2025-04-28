import { motion } from 'framer-motion';

const BackgroundBlobs = () => {
  return (
    <div style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: -1,
      opacity: 0.4,
    }}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'var(--blob-1)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '50%',
          right: '20%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'var(--blob-2)',
          filter: 'blur(90px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'var(--blob-3)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
};

export default BackgroundBlobs;
