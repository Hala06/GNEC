import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

const CTAButton = ({
  text = "Get Started",
  onClick,
  href,
  variant = "primary",
  fullWidth = false,
  icon,
  disabled = false,
  ariaLabel
}) => {
  const { settings } = useAccessibility();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;
    
    if (href) {
      e.preventDefault();
      navigate(href);
    }
    if (onClick) onClick(e);
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, var(--accent), var(--hover))`,
      color: 'var(--background)',
      hover: { 
        scale: settings.reducedMotion ? 1 : 1.05, 
        boxShadow: '0 4px 12px rgba(var(--accent-rgb), 0.3)'
      }
    },
    secondary: {
      background: 'var(--secondary)',
      color: 'var(--text)',
      hover: { 
        scale: settings.reducedMotion ? 1 : 1.05,
        background: 'var(--hover)'
      }
    },
    outline: {
      background: 'transparent',
      color: 'var(--accent)',
      border: '2px solid var(--accent)',
      hover: { 
        scale: settings.reducedMotion ? 1 : 1.05,
        background: 'rgba(var(--accent-rgb), 0.1)'
      }
    }
  };

  return (
    <motion.button
      className={`cta-button ${variant} ${fullWidth ? 'full-width' : ''}`}
      onClick={handleClick}
      whileHover={disabled ? {} : variants[variant].hover}
      whileTap={disabled ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      disabled={disabled}
      aria-label={ariaLabel || text}
      style={{
        padding: '1rem 1.5rem',
        borderRadius: '50px',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.7 : 1,
        ...variants[variant]
      }}
    >
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      {text}
      {!disabled && (
        <motion.span
          animate={settings.reducedMotion ? {} : { x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          →
        </motion.span>
      )}
    </motion.button>
  );
};

export default CTAButton;
