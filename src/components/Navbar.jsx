import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SunIcon from '../assets/sun.png';
import MoonIcon from '../assets/moon.png';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark-mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 2rem',
      background: isDarkMode 
        ? 'rgba(21, 21, 40, 0.85)'
        : 'rgba(245, 247, 249, 0.85)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={styles.logo}>GNEC</div>
      <ul style={styles.navLinks}>
        <li><a style={styles.link} href="#features">Features</a></li>
        <li><a style={styles.link} href="#demo">Demo</a></li>
        <li><a style={styles.link} href="#click">Click-to-Read</a></li>
        <li><a style={styles.link} href="#about">About</a></li>
        <li><a style={styles.link} href="https://github.com/ket3l4/Listen-Up" target="_blank">Download</a></li>
      </ul>

      <motion.button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          background: `linear-gradient(145deg, ${isDarkMode ? 'var(--toggle-bg-dark)' : 'var(--toggle-bg-light)'}, ${isDarkMode ? 'var(--secondary)' : 'var(--accent)'})`,
          border: 'none',
          cursor: 'pointer',
          marginLeft: '1rem',
          padding: '0.8rem',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <motion.img 
          src={isDarkMode ? MoonIcon : SunIcon} 
          alt="Toggle Theme"
          initial={{ rotate: 0 }}
          animate={{ rotate: isDarkMode ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: isDarkMode ? '45px' : '40px',
            height: isDarkMode ? '45px' : '40px',
            objectFit: 'contain',
            filter: isDarkMode ? 'brightness(1.5) contrast(1.2)' : 'none'
          }}
        />
      </motion.button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem', // Reduced padding for a smaller header
    color: 'var(--text)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky', // Sticky header
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(8px)', // Slight blur for a modern look
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', // Subtle shadow for depth
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem', // Reduced logo size
    background: 'linear-gradient(135deg, var(--accent), var(--hover))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.02em',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem', // Reduced gap for better spacing
    alignItems: 'center',
  },
  link: {
    color: 'var(--text)',
    fontWeight: '600',
    fontSize: '0.9rem', // Slightly smaller font size
    letterSpacing: '0.02em',
    padding: '0.4rem 0.8rem',
    borderRadius: '8px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      color: 'var(--accent)',
      background: 'var(--secondary)',
      transform: 'translateY(-2px)',
    },
    '&:focus': {
      outline: '3px solid var(--hover)',
      outlineOffset: '2px',
    },
  }
};

export default Navbar;
