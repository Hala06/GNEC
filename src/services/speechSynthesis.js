export const getAvailableVoices = () => {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      const onVoicesChanged = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        resolve(window.speechSynthesis.getVoices());
      };
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    }
  });
};

export const speakText = (text, options = {}) => {
  if (!window.speechSynthesis || !text) return null;

  // Cancel any current speech
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  // Create new utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Apply options
  utterance.rate = options.rate || 1.0;
  utterance.pitch = options.pitch || 1.0;
  utterance.voice = options.voice || null;
  utterance.lang = options.lang || (options.voice?.lang || 'en-US');

  // Event handlers
  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onError) utterance.onerror = options.onError;
  if (options.onPause) utterance.onpause = options.onPause;
  if (options.onResume) utterance.onresume = options.onResume;
  if (options.onBoundary) utterance.onboundary = options.onBoundary;

  // Speak
  window.speechSynthesis.speak(utterance);

  return {
    cancel: () => window.speechSynthesis.cancel(),
    pause: () => window.speechSynthesis.pause(),
    resume: () => window.speechSynthesis.resume(),
    utterance
  };
};

export const highlightElementForReading = (element, highlightColor = 'rgba(255, 215, 0, 0.3)') => {
  if (!element) return null;

  const originalBackground = element.style.backgroundColor;
  const originalOutline = element.style.outline;
  const originalTransition = element.style.transition;

  element.style.transition = 'background-color 0.3s ease, outline 0.3s ease';
  element.style.backgroundColor = highlightColor;
  element.style.outline = '2px solid currentColor';

  const resetHighlight = () => {
    element.style.backgroundColor = originalBackground;
    element.style.outline = originalOutline;
    element.style.transition = originalTransition;
    element.removeEventListener('mouseleave', resetHighlight);
    element.removeEventListener('blur', resetHighlight);
    element.removeEventListener('click', resetHighlight);
  };

  element.addEventListener('mouseleave', resetHighlight);
  element.addEventListener('blur', resetHighlight);
  element.addEventListener('click', resetHighlight);

  return resetHighlight;
};