import { useEffect, useRef } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export const useScreenReader = () => {
  const { settings } = useAccessibility();
  const synthRef = useRef(null);
  const currentUtterance = useRef(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      if (synthRef.current?.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speak = (text, options = {}) => {
    if (!settings.isScreenReaderActive || !text) return;

    // Cancel any current speech
    if (synthRef.current?.speaking) {
      synthRef.current.cancel();
    }

    // Create new utterance
    currentUtterance.current = new SpeechSynthesisUtterance(text);
    const { rate = 1, pitch = 1, voice = null } = options;
    
    // Apply settings
    currentUtterance.current.rate = rate * settings.speech.rate;
    currentUtterance.current.pitch = pitch * settings.speech.pitch;
    currentUtterance.current.voice = voice || settings.speech.voice;
    currentUtterance.current.lang = (voice || settings.speech.voice)?.lang || 'en-US';

    // Speak
    synthRef.current.speak(currentUtterance.current);
  };

  return {
    speak,
    stop: () => synthRef.current?.cancel(),
    isActive: settings.isScreenReaderActive,
    isSpeaking: synthRef.current?.speaking || false
  };
};