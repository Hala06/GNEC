// Theme helpers
export const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

export const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
};

export const initTheme = () => {
  const theme = getPreferredTheme();
  setTheme(theme);
  return theme;
};

// Performance helpers
export const debounce = (func, wait = 100) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export const throttle = (func, limit = 100) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// DOM helpers
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const smoothScrollTo = (element, offset = 80) => {
  window.scrollTo({
    behavior: 'smooth',
    top: element.getBoundingClientRect().top + window.pageYOffset - offset,
  });
};

// Accessibility helpers
export const announce = (message, politeness = 'polite') => {
  const liveRegion = document.getElementById('a11y-live-region') || createLiveRegion();
  liveRegion.setAttribute('aria-live', politeness);
  
  // Clear previous message
  liveRegion.textContent = '';
  
  // Force a reflow to ensure screen readers announce the new message
  void liveRegion.offsetWidth;
  
  liveRegion.textContent = message;

  // Clear message after a delay
  setTimeout(() => {
    liveRegion.textContent = '';
  }, 5000);
};

const createLiveRegion = () => {
  const region = document.createElement('div');
  region.id = 'a11y-live-region';
  region.className = 'sr-only';
  region.setAttribute('aria-atomic', 'true');
  document.body.appendChild(region);
  return region;
};

export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTab = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  firstElement.focus();
  element.addEventListener('keydown', handleTab);

  return () => {
    element.removeEventListener('keydown', handleTab);
  };
};
