import { motion } from 'framer-motion';

const SectionDivider = ({ variant = 1 }) => {
  const pathVariants = {
    initial: {
      pathLength: 0,
    },
    animate: {
      pathLength: 1,
      transition: {
        duration: 4, // Increased from 2 to 4
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const waveVariants = {
    initial: { x: -1000 },
    animate: {
      x: 0,
      transition: {
        duration: 30, // Increased from 20 to 30
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      style={{
        width: '100%',
        height: '100px',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '-1rem',
        marginBottom: '-1rem'
      }}
      initial="initial"
      animate="animate"
    >
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{
          width: '150%',
          height: '100%',
          position: 'absolute',
          left: '-25%'
        }}
        variants={waveVariants}
      >
        <motion.path
          d={variant === 1 ? "M0,50 C360,90 720,10 1440,50" :
             variant === 2 ? "M0,20 C480,80 960,0 1440,40" :
                           "M0,40 C240,70 720,0 1440,30"}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeOpacity="0.5"
          variants={pathVariants}
        />
        <motion.path
          d={variant === 1 ? "M0,30 C360,70 720,-10 1440,30" :
             variant === 2 ? "M0,60 C480,20 960,100 1440,60" :
                           "M0,60 C240,30 720,100 1440,70"}
          fill="none"
          stroke="var(--hover)"
          strokeWidth="2"
          strokeOpacity="0.3"
          variants={pathVariants}
        />
      </motion.svg>
    </motion.div>
  );
};

export default SectionDivider;
