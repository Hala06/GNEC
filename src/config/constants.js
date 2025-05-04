// Accessibility settings constants
export const ACCESSIBILITY_SETTINGS = {
  CURSOR: {
    SIZES: ['small', 'medium', 'large'],
    COLORS: ['#4A90A8', '#FF5722', '#8B85D8', '#4CAF50'],
    SHAPES: ['default', 'circle', 'pointer', 'crosshair']
  },
  HIGHLIGHT: {
    COLORS: [
      'rgba(255, 215, 0, 0.3)', 
      'rgba(74, 144, 168, 0.3)', 
      'rgba(139, 135, 216, 0.3)'
    ],
    STYLES: ['solid', 'dashed', 'double']
  },
  SPEECH: {
    RATES: [0.5, 0.75, 1.0, 1.25, 1.5],
    PITCHES: [0.5, 0.75, 1.0, 1.25, 1.5],
    VOICES: [] // Will be populated from browser voices
  },
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    HIGH_CONTRAST: 'high-contrast'
  },
  REDUCED_MOTION: {
    ENABLED: 'enabled',
    DISABLED: 'disabled'
  }
};

// UI constants
export const UI = {
  BREAKPOINTS: {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1440
  },
  Z_INDEX: {
    LOWEST: 0,
    LOW: 10,
    MEDIUM: 100,
    HIGH: 1000,
    HIGHEST: 9999
  },
  TRANSITIONS: {
    FAST: 0.1,
    NORMAL: 0.3,
    SLOW: 0.5
  }
};

// API endpoints
export const API = {
  EXTENSION_DOWNLOAD: {
    CHROME: 'https://chrome.google.com/webstore/detail/gnec-accessibility/',
    FIREFOX: 'https://addons.mozilla.org/firefox/addon/gnec-accessibility/',
    EDGE: 'https://microsoftedge.microsoft.com/addons/detail/gnec-accessibility/'
  },
  TEXT_TO_SPEECH: {
    ENDPOINT: 'https://api.gnec.io/tts',
    LANGUAGES: ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'ar-SA']
  }
};

// ARIA roles and labels
export const ARIA = {
  ROLES: {
    BUTTON: 'button',
    LINK: 'link',
    PRESENTATION: 'presentation'
  },
  LIVE_REGIONS: {
    POLITE: 'polite',
    ASSERTIVE: 'assertive'
  }
};

// Keyboard keys
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight'
};