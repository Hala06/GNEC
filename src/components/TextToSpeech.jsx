       height: '18px',
      background: 'var(--accent)',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid var(--border)',
      transition: 'all 0.3s ease',
    },
    '&:focus': {
      boxShadow: '0 0 0 3px var(--accent)',
    }
  },
  buttonGroup: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    padding: '1rem',
  },
  button: {
    padding: '1.5rem 3rem',
    fontSize: '1.3rem',
    fontWeight: '600',
    borderRadius: '12px',
    border: '2px solid var(--border)',
    color: 'var(--background)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    letterSpacing: '0.02em',
    outline: 'none',
    minWidth: '200px',
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.7,
      transform: 'none',
      background: 'var(--border) !important',
    },
    '&:focus': {
      boxShadow: '0 0 0 3px var(--accent)',
    },
    '&:focus-visible': {
      outline: '3px solid var(--hover)',
      outlineOffset: '2px',
    }
  },
}

export default TextToSpeech
