import { useEffect, useRef } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export const useScreenReader = () => {
  const { settings } = useAccessibility();
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  const speak = (text, options = {}) => {
    if (!settings.isScreenReaderActive) return;

    // Cancel any current speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }

    // Create new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    
    // Apply settings and options
    const { rate = settings.speech.rate, pitch = settings.speech.pitch, voice = settings.speech.voice } = options;
    utteranceRef.current.rate = rate;
    utteranceRef.current.pitch = pitch;
    utteranceRef.current.voice = voice;

    // Speak
    synthRef.current.speak(utteranceRef.current);
  };

  const stop = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  return { speak, stop, isActive: settings.isScreenReaderActive };
};