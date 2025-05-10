import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import CTAButton from '../../core/Buttons/CTAButton';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import browserIcons from '/assets/images/icons.jpg';

const Navbar = () => {
  const navigate = useNavigate();
  const { settings, toggleTheme, toggleScreenReader } = useAccessibility();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', path: '#features' },
    { name: 'Demo', path: '#demo' },
    { name: 'About', path: '#about' }
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
          ? `rgba(var(--background-rgb), 0.95)`
          : 'transparent',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none'
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }} aria-label="Home">
        <motion.div
          whileHover={settings.reducedMotion ? {} : { scale: 1.05 }}
          style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, var(--accent), var(--hover))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          AccessEd
          <img 
            src={browserIcons} 
            alt="Browser support icons"
            style={{
              height: '1.8rem',
              borderRadius: '8px',
              marginLeft: '0.5rem'
            }}
          />
        </motion.div>
      </Link>

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.path}
              whileHover={settings.reducedMotion ? {} : { y: -2 }}
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

        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <button
            onClick={toggleScreenReader}
            aria-label={`Screen reader ${settings.isScreenReaderActive ? 'on' : 'off'}`}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: settings.isScreenReaderActive ? 'var(--accent)' : 'var(--text)'
            }}
          >
            {settings.isScreenReaderActive ? '🔊' : '🔇'}
          </button>

          <button
            onClick={toggleTheme}
            aria-label={`Toggle ${settings.theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'var(--text)'
            }}
          >
            {settings.theme === 'light' ? '🌙' : '☀️'}
          </button>

          <CTAButton
            text="Get Extension"
            variant="outline"
            onClick={() => window.open('https://github.com/ket3l4/AccessEd', '_blank')}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            fontSize: '1.5rem',
            padding: '0.5rem'
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: 'var(--background)',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              minWidth: '250px',
              zIndex: 1000
            }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.path}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  transition: 'background 0.2s ease'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  const target = document.querySelector(link.path);
                  if (target) {
                    target.scrollIntoView({ behavior: settings.reducedMotion ? 'auto' : 'smooth' });
                  }
                }}
              >
                {link.name}
              </motion.a>
            ))}
            <div className="menu-footer" style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderTop: '1px solid var(--border)',
              marginTop: '0.5rem'
            }}>
              <button
                onClick={toggleScreenReader}
                aria-label={`Screen reader ${settings.isScreenReaderActive ? 'on' : 'off'}`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: settings.isScreenReaderActive ? 'var(--accent)' : 'var(--text)'
                }}
              >
                {settings.isScreenReaderActive ? '🔊' : '🔇'}
              </button>
              <button
                onClick={toggleTheme}
                aria-label={`Toggle ${settings.theme === 'dark' ? 'light' : 'dark'} mode`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: 'var(--text)'
                }}
              >
              {settings.theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
