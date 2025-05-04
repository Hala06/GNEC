import { useEffect, useRef } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export const useScreenReader = () => {
  const { settings } = useAccessibility();
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

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
    utteranceRef.current = new SpeechSynthesisUtterance(text);

    // Apply settings and options
    const {
      rate = settings.speech.rate,
      pitch = settings.speech.pitch,
      voice = settings.speech.voice,
      onStart,
      onEnd,
      onError
    } = options;

    utteranceRef.current.rate = rate;
    utteranceRef.current.pitch = pitch;
    utteranceRef.current.voice = voice;
    utteranceRef.current.lang = voice?.lang || 'en-US';

    // Event handlers
    if (onStart) utteranceRef.current.onstart = onStart;
    if (onEnd) utteranceRef.current.onend = onEnd;
    if (onError) utteranceRef.current.onerror = onError;

    // Speak
    synthRef.current.speak(utteranceRef.current);
  };

  const stop = () => {
    if (synthRef.current?.speaking) {
      synthRef.current.cancel();
    }
  };

  const pause = () => {
    if (synthRef.current?.speaking) {
      synthRef.current.pause();
    }
  };

  const resume = () => {
    if (synthRef.current?.paused) {
      synthRef.current.resume();
    }
  };

  return { 
    speak, 
    stop, 
    pause, 
    resume, 
    isActive: settings.isScreenReaderActive,
    isSpeaking: synthRef.current?.speaking || false,
    isPaused: synthRef.current?.paused || false
  };
};