import { Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home/HomePage';
import CursorHighlighter from './components/accessibility/CursorHighlighter';
import FocusBorder from './components/accessibility/FocusBorder';
import ScreenReader from './components/accessibility/ScreenReader';
import Stars from './components/Ui/Stars';

function App() {
  return (
    <AccessibilityProvider>
      {/* Accessibility Tools */}
      <Stars />
      <CursorHighlighter />
      <FocusBorder />
      <ScreenReader />

      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      </Routes>
    </AccessibilityProvider>
  );
}

export default App;
