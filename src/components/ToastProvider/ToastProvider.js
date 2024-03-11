import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function handleDismissToast(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }
    window.addEventListener('keydown', handleDismissToast);

    return () => window.removeEventListener('keydown', handleDismissToast);
  }, []);

  function createToast({ message, variant }) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function deleteToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }
  return (
    <ToastContext.Provider value={{ toasts, createToast, deleteToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
