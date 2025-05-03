import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CTAButton from '../../core/Buttons/CTAButton';
import SunIcon from '/assets/icons/sun.png';
import MoonIcon from '/assets/icons/moon.png';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme and scroll effects
  useEffect(() => {
    // Check system preference and localStorage
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('theme');
    const initialMode = savedMode ? savedMode === 'dark' : prefersDark;
    
    setIsDarkMode(initialMode);
    document.body.setAttribute('data-theme', initialMode ? 'dark' : 'light');

    // Scroll effect
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Nav links data
  const navLinks = [
    { name: 'Features', path: '#features' },
    { name: 'Demo', path: '#demo' },
    { name: 'About', path: '#about' },
    { name: 'Docs', path: '/docs' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 9999,
        background: scrolled 
          ? `rgba(${isDarkMode ? '21, 21, 40' : '245, 247, 249'}, ${isDarkMode ? 0.95 : 0.97})`
          : 'transparent',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none'
      }}
    >
      {/* Logo */}
      <Link 
        to="/" 
        style={{ textDecoration: 'none' }}
        aria-label="Home"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, var(--accent), var(--hover))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          GNEC
        </motion.div>
      </Link>

      {/* Desktop Navigation */}
      <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.path}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              aria-label={link.name}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <CTAButton 
            text="Download" 
            variant="outline" 
            href="/download" 
            style={{ padding: '0.75rem 1.5rem' }}
          />
          
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'var(--secondary)',
              border: 'none',
              padding: '0.8rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label={`Toggle ${isDarkMode ? 'Light' : 'Dark'} Mode`}
          >
            <motion.img
              src={isDarkMode ? SunIcon : MoonIcon}
              alt=""
              style={{ width: '24px', height: '24px' }}
              animate={{ rotate: isDarkMode ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav" style={{ display: 'none' }}>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            fontSize: '1.5rem'
          }}
        >
          ☰
        </button>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--background)',
              padding: '1rem',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.path}
                style={{
                  display: 'block',
                  padding: '1rem',
                  color: 'var(--text)',
                  textDecoration: 'none'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>

    </motion.nav>
  );
};

export default Navbar;
