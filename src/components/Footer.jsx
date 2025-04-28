const Footer = () => {
  return (
    <footer style={{
      background: 'var(--gradient-primary)',
      padding: '1rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: 'var(--text)',
      opacity: 0.8,
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <p style={{ margin: 0 }}>© 2024 GNEC. All rights reserved.</p>
          <nav>
            <a href="#privacy" style={{ marginLeft: '1rem', opacity: 0.8 }}>Privacy</a>
            <a href="#terms" style={{ marginLeft: '1rem', opacity: 0.8 }}>Terms</a>
            <a href="https://github.com/ket3l4/Listen-Up" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '1rem', opacity: 0.8 }}>GitHub</a>
          </nav>
        </div>
        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
          Illustrations generated using <a href="https://lumalabs.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Luma Labs Dream Machine</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
