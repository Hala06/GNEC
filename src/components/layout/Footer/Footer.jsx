import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const links = [
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
    { name: 'GitHub', path: 'https://github.com/ket3l4/Listen-Up', external: true },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'var(--gradient-primary)',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: 'var(--text)',
        borderTop: '1px solid var(--border)',
        marginTop: '4rem'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
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

          <nav style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {links.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.external ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontWeight: '500',
                      opacity: 0.8,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    style={{
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontWeight: '500',
                      opacity: 0.8,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          opacity: 0.7,
          fontSize: '0.9rem'
        }}>
          <p style={{ margin: 0 }}>
            © {currentYear} GNEC. All rights reserved.
          </p>
          <p style={{ margin: 0 }}>
            Made with ❤️ for the GNEC Hackathon 2025
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;