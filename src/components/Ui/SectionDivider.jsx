import { motion } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const SectionDivider = ({ variant = 1 }) => {
  const { settings } = useAccessibility();
  const paths = [
    "M0,50 C150,90 300,10 450,50 S600,90 750,50 S900,10 1050,50",
    "M0,30 C150,70 300,-10 450,30 S600,70 750,30 S900,-10 1050,30",
    "M0,70 C150,30 300,90 450,70 S600,30 750,70 S900,90 1050,70"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: settings.reducedMotion ? 0 : 1 }}
      style={{
        width: '100%',
        height: '120px',
        position: 'relative',
        overflow: 'hidden',
        margin: '-1px 0'
      }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 1050 100"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
      >
        <motion.path
          d={paths[variant - 1]}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{
            pathLength: settings.reducedMotion ? 1 : 1,
            transition: {
              duration: settings.reducedMotion ? 0 : 2,
              ease: "easeInOut"
            }
          }}
        />
        <motion.path
          d={paths[(variant + 1) % 3]}
          fill="none"
          stroke="var(--hover)"
          strokeWidth="2"
          strokeOpacity="0.2"
          initial={{ pathLength: 0 }}
          whileInView={{
            pathLength: settings.reducedMotion ? 1 : 1,
            transition: {
              duration: settings.reducedMotion ? 0 : 2.5,
              delay: settings.reducedMotion ? 0 : 0.5,
              ease: "easeInOut"
            }
          }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default SectionDivider;