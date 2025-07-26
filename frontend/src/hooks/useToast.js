import { useState, useCallback } from 'react';

// Simple toast hook implementation
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, duration = 5000) => 
    addToast(message, 'success', duration), [addToast]);
  
  const error = useCallback((message, duration = 5000) => 
    addToast(message, 'error', duration), [addToast]);
  
  const warning = useCallback((message, duration = 5000) => 
    addToast(message, 'warning', duration), [addToast]);
  
  const info = useCallback((message, duration = 5000) => 
    addToast(message, 'info', duration), [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };
};
