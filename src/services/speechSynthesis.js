export const getAvailableVoices = () => {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) return resolve([]);
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) return resolve(voices);
    
    const listener = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', listener);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', listener);
  });
};

export const speakText = (text, options = {}) => {
  if (!window.speechSynthesis || !text) return null;

  // Cancel current speech
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  Object.assign(utterance, options);

  // Speak
  window.speechSynthesis.speak(utterance);
  return utterance;
};

export const highlightElementForReading = (element, color = 'rgba(139, 135, 216, 0.3)') => {
  if (!element) return null;

  const originalStyle = {
    background: element.style.background,
    transition: element.style.transition
  };

  element.style.transition = 'background 0.3s ease';
  element.style.background = color;

  return () => {
    element.style.background = originalStyle.background;
    element.style.transition = originalStyle.transition;
  };
};