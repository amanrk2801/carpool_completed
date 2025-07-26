import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * This component automatically scrolls to the top of the page
 * whenever the route changes. It should be placed inside the Router
 * but outside the Routes component.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top on route change for better performance
    if (window.scrollTo) {
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: 'instant'
      });
    }
    // Multiple fallback methods for maximum compatibility
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Additional scroll for any scrollable containers
    const scrollableElements = document.querySelectorAll('[style*="overflow"]');
    scrollableElements.forEach(element => {
      element.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
