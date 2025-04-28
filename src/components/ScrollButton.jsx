import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const lastScroll = useRef(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const currentScroll = window.scrollY;
      const direction = currentScroll > lastScroll.current ? 'down' : 'up';
      
      setIsVisible(currentScroll > 100);
      setScrollDirection(direction);
      lastScroll.current = currentScroll;
    }
    
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleClick = () => {
    if (scrollDirection === 'up') {
      window.scrollTo({ 
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button 
          key="scroll"
          onClick={handleClick}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="scroll-button"
          aria-label="Scroll to top"
        >
          {scrollDirection === 'up' ? '↓' : '↑'}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollButton
