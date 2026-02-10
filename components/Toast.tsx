import React, { useEffect, useState } from 'react';
import type { ToastType } from '../types';

interface ToastProps {
  message: string | null;
  type: ToastType;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Allow time for fade-out animation before clearing the message
        setTimeout(onDismiss, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  // Use a consistent dark olive (theme primary) background for all toasts
  const olive = 'bg-primary text-primary-foreground border-primary';
  const toastStyles: Record<ToastType, string> = {
    error: olive,
    success: olive,
    warning: olive,
    info: olive,
  };

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg shadow-xl border-2 transition-all duration-300 ${toastStyles[type] || toastStyles.error} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
};
