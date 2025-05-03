export const getAvailableVoices = () => {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(window.speechSynthesis.getVoices());
          window.speechSynthesis.onvoiceschanged = null;
        };
      }
    });
  };
  
  export const speakText = (text, options = {}) => {
    const synth = window.speechSynthesis;
    
    // Cancel any current speech
    if (synth.speaking) {
      synth.cancel();
    }
  
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply options
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.0;
    utterance.voice = options.voice || null;
    utterance.lang = options.lang || 'en-US';
  
    // Event handlers
    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;
  
    // Speak
    synth.speak(utterance);
  
    return {
      cancel: () => synth.cancel(),
      pause: () => synth.pause(),
      resume: () => synth.resume()
    };
  };
  
  export const highlightElementForReading = (element, highlightColor = 'rgba(255, 215, 0, 0.3)') => {
    if (!element) return;
  
    const originalBackground = element.style.backgroundColor;
    const originalTransition = element.style.transition;
  
    element.style.transition = 'background-color 0.3s ease';
    element.style.backgroundColor = highlightColor;
  
    const resetHighlight = () => {
      element.style.backgroundColor = originalBackground;
      element.style.transition = originalTransition;
      element.removeEventListener('mouseleave', resetHighlight);
      element.removeEventListener('blur', resetHighlight);
    };
  
    element.addEventListener('mouseleave', resetHighlight);
    element.addEventListener('blur', resetHighlight);
  
    return resetHighlight;
  };