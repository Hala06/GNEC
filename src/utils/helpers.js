// Sets the theme and saves to localStorage
export const setTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

// Gets the current theme from localStorage or system preference
export const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
};

// Toggles between light and dark theme
export const toggleTheme = () => {
  const currentTheme = document.body.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
};

// Initializes theme based on user preference
export const initTheme = () => {
  const theme = getPreferredTheme();
  setTheme(theme);
  return theme;
};

// Debounce function for performance optimization
export const debounce = (func, wait = 100) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Throttle function for scroll/resize events
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

// Generates unique ID
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Checks if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Smooth scroll to element
export const smoothScrollTo = (element, offset = 80) => {
  window.scrollTo({
    behavior: 'smooth',
    top: element.getBoundingClientRect().top + window.pageYOffset - offset,
  });
};

// ARIA live region helper
export const announce = (message, politeness = 'polite') => {
  const liveRegion = document.getElementById('a11y-live-region') || createLiveRegion();
  liveRegion.setAttribute('aria-live', politeness);
  liveRegion.textContent = message;
  
  // Clear message after a delay
  setTimeout(() => {
    liveRegion.textContent = '';
  }, 5000);
};

// Create ARIA live region if it doesn't exist
const createLiveRegion = () => {
  const region = document.createElement('div');
  region.id = 'a11y-live-region';
  region.className = 'sr-only';
  document.body.appendChild(region);
  return region;
};
