import { createContext, useContext, useState, useEffect } from 'react';
import { ACCESSIBILITY_SETTINGS } from '../config/constants';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
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
    theme: ACCESSIBILITY_SETTINGS.THEMES.LIGHT,
    isScreenReaderActive: false
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }, [settings]);

  // Initialize speech voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0 && !settings.speech.voice) {
        const defaultVoice = voices.find(v => v.default) || voices[0];
        updateSetting('speech', { ...settings.speech, voice: defaultVoice });
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [settings.speech]);

  const updateSetting = (category, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], ...newSettings }
    }));
  };

  const toggleScreenReader = () => {
    setSettings(prev => ({
      ...prev,
      isScreenReaderActive: !prev.isScreenReaderActive
    }));
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === ACCESSIBILITY_SETTINGS.THEMES.LIGHT
      ? ACCESSIBILITY_SETTINGS.THEMES.DARK
      : ACCESSIBILITY_SETTINGS.THEMES.LIGHT;
    
    updateSetting('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        toggleScreenReader,
        toggleTheme
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