import { useEffect } from 'react';

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast toast-${toast.type}`}>{toast.message}</div>
    </div>
  );
}

export default Toast;
