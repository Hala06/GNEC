import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CTAButton = ({ 
  text = "Get Started", 
  onClick, 
  href, 
  variant = "primary",
  fullWidth = false 
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (href) {
      e.preventDefault();
      navigate(href);
    }
    if (onClick) onClick(e);
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--accent), var(--hover))',
      color: 'var(--background)',
      hover: { scale: 1.05, boxShadow: '0 4px 20px rgba(var(--accent-rgb), 0.3)' }
    },
    secondary: {
      background: 'var(--secondary)',
      color: 'var(--text)',
      hover: { scale: 1.05, boxShadow: '0 4px 20px rgba(var(--text-rgb), 0.1)' }
    },
    outline: {
      background: 'transparent',
      color: 'var(--accent)',
      border: '2px solid var(--accent)',
      hover: { backgroundColor: 'rgba(var(--accent-rgb), 0.1)' }
    }
  };

  return (
    <motion.button
      className={`cta-button ${variant} ${fullWidth ? 'full-width' : ''}`}
      onClick={handleClick}
      whileHover={variants[variant].hover || { scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: '1rem 2rem',
        borderRadius: '50px',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: fullWidth ? '100%' : 'auto',
        ...variants[variant]
      }}
    >
      {text}
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        →
      </motion.span>
    </motion.button>
  );
};

export default CTAButton;