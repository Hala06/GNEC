import { motion } from 'framer-motion';
import { useAccessibility } from '/src/contexts/AccessibilityContext';

const stats = [
  {
    label: 'Live with disabilities',
    number: '1.3 B',
    emoji: '♿️',
    chart: (
      <svg width="120" height="6" style={{ display:'block', margin:'0 auto' }}>
        <rect width="120" height="6" fill="var(--secondary)" rx="3" />
        <rect width="17" height="6" fill="var(--accent)" rx="3">
          <animate attributeName="width" from="0" to="17" dur="1.5s" fill="freeze" />
        </rect>
      </svg>
    ),
    source: 'WHO Disability Report'
  },
  {
    label: 'Homepages fail WCAG',
    number: '96 %',
    emoji: '🚫',
    chart: (
      <svg width="120" height="6" style={{ display:'block', margin:'0 auto' }}>
        <rect width="120" height="6" fill="var(--secondary)" rx="3" />
        <rect width="115" height="6" fill="var(--accent)" rx="3">
          <animate attributeName="width" from="0" to="115" dur="1.5s" fill="freeze" />
        </rect>
      </svg>
    ),
    source: 'WebAIM Million Report'
  },
  {
    label: '65+ go online',
    number: '67 %',
    emoji: '👵',
    chart: (
      <svg viewBox="0 0 36 36" width="90" height="90" style={{ display:'block', margin:'0 auto' }}>
        <circle r="16" cx="18" cy="18" fill="var(--secondary)" />
        <circle
          r="16" cx="18" cy="18"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeDasharray="67 33"
          transform="rotate(-90 18 18)"
        >
          <animate attributeName="stroke-dasharray" from="0 100" to="67 33" dur="1.5s" fill="freeze" />
        </circle>
      </svg>
    ),
    source: 'Pew Research'
  },
  {
    label: 'Lost e‑commerce',
    number: '$16 B',
    emoji: '💸',
    chart: (
      <motion.div 
        style={{ fontSize:'3.5rem', margin:'0.5rem 0' }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        💸
      </motion.div>
    ),
    source: 'Twilio Research'
  }
];

const WhyNeeded = () => {
  const { speak } = useAccessibility();
  
  return (
    <motion.section
      id="why"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '8rem 2rem',
        background: 'linear-gradient(135deg, var(--background), var(--secondary))',
        maxWidth: '1200px',
        margin: '6rem auto',
        borderRadius: '32px',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(var(--text-rgb),0.1)',
        overflow: 'hidden'
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at 50% 0%, var(--blob-1) 0%, transparent 70%)',
          opacity: 0.5,
          zIndex: 0
        }}
      />

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: '3rem',
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, var(--accent), var(--hover))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          fontWeight: '700',
          position: 'relative'
        }}
      >
        Why AccessEd Matters
      </motion.h2>

      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {stats.map((stat, i) => (
          <motion.button
            key={i}
            onClick={() => speak(`${stat.number} ${stat.label}`)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              padding: '2.5rem',
              background: 'rgba(var(--background-rgb), 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(var(--text-rgb),0.03)',
              borderRadius: '24px',
              cursor: 'pointer',
              color: 'var(--text)',
              position: 'relative',
              boxShadow: '0 4px 6px -1px rgba(var(--text-rgb),0.1)'
            }}
            whileHover={{
              y: -5,
              background: 'rgba(var(--background-rgb), 0.9)',
              boxShadow: '0 20px 25px -5px rgba(var(--text-rgb),0.1), 0 8px 10px -6px rgba(var(--text-rgb),0.05)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.1 }}
              style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
            >
              {stat.emoji}
            </motion.div>
            
            <motion.div
              style={{
                fontSize: '2.75rem',
                fontWeight: '800',
                color: 'var(--accent)',
                margin: '0.75rem 0',
                letterSpacing: '-0.02em'
              }}
            >
              {stat.number}
            </motion.div>

            <div style={{ margin: '1.5rem 0', opacity: 0.9 }}>
              {stat.chart}
            </div>

            <motion.div
              style={{
                fontSize: '1.1rem',
                opacity: 0.75,
                fontWeight: '500',
                textAlign: 'center'
              }}
            >
              {stat.label}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: 'absolute',
                bottom: '1rem',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                opacity: 0.6
              }}
            >
              {stat.source}
            </motion.div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        transition={{ delay: 0.5 }}
        style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.9rem'
        }}
      >
        Click on any statistic to hear it read aloud
      </motion.p>
    </motion.section>
  );
};

export default WhyNeeded;
