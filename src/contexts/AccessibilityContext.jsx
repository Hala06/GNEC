import { createContext, useContext, useState, useEffect } from 'react';
import { ACCESSIBILITY_SETTINGS } from '/src/config/constants';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    // Initialize with default settings
    const defaultSettings = {
      cursor: {
        size: 'medium',
        color: ACCESSIBILITY_SETTINGS.CURSOR.COLORS[0],
        shape: 'default'
      },
      highlight: {
        color: ACCESSIBILITY_SETTINGS.HIGHLIGHT.COLORS[0],
        style: 'solid'
      },
      speech: {
        rate: 1.0,
        pitch: 1.0,
        voice: null
      },
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? ACCESSIBILITY_SETTINGS.THEMES.DARK 
        : ACCESSIBILITY_SETTINGS.THEMES.LIGHT,
      isScreenReaderActive: false,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    // Try to load from localStorage
    try {
      const savedSettings = JSON.parse(localStorage.getItem('accessibilitySettings'));
      return savedSettings ? { ...defaultSettings, ...savedSettings } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Apply theme on mount and when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }, [settings]);

  // Initialize speech voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis?.getVoices() || [];
      if (voices.length > 0 && !settings.speech.voice) {
        const defaultVoice = voices.find(v => v.default) || voices[0];
        updateSetting('speech', { ...settings.speech, voice: defaultVoice });
      }
    };

    if (window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [settings.speech]);

  const updateSetting = (category, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], ...newSettings }
    }));
  };

  const toggleScreenReader = () => {
    const newValue = !settings.isScreenReaderActive;
    setSettings(prev => ({
      ...prev,
      isScreenReaderActive: newValue
    }));
    
    // Stop any current speech when turning off
    if (!newValue && window.speechSynthesis?.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleTheme = () => {
    const currentTheme = settings.theme;
    const newTheme = currentTheme === ACCESSIBILITY_SETTINGS.THEMES.LIGHT
      ? ACCESSIBILITY_SETTINGS.THEMES.DARK
      : ACCESSIBILITY_SETTINGS.THEMES.LIGHT;
    
    setSettings(prev => ({
      ...prev,
      theme: newTheme
    }));
  };

  const toggleReducedMotion = () => {
    updateSetting('reducedMotion', !settings.reducedMotion);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        toggleScreenReader,
        toggleTheme,
        toggleReducedMotion
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
