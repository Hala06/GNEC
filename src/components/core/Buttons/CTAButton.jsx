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
  ariaLabel,
  className = "",
  type = "button"
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

  const hoverAnimation = disabled || settings.reducedMotion ? {} : {
    scale: 1.05,
    y: -2,
    boxShadow: variant === 'primary' ? '0 6px 16px rgba(var(--accent-rgb), 0.3)' : '0 6px 16px rgba(0,0,0,0.1)'
  };

  return (
    <motion.button
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''} ${className}`}
      onClick={handleClick}
      whileHover={hoverAnimation}
      whileTap={disabled ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      disabled={disabled}
      aria-label={ariaLabel || text}
      type={type}
      style={{
        '--accent-rgb': '139, 135, 216', // Purple
        '--hover-rgb': '165, 161, 229' // Lighter purple
      }}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{text}</span>
      {!disabled && variant === 'primary' && (
        <motion.span
          className="btn__arrow"
          animate={settings.reducedMotion ? {} : { 
            x: [0, 4, 0],
            opacity: [1, 0.8, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          →
        </motion.span>
      )}
    </motion.button>
  );
};

export default CTAButton;