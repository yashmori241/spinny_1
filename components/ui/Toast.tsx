'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9000] flex flex-col gap-3">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const borderColor =
    toast.type === 'success'
      ? 'border-brand-gold'
      : toast.type === 'error'
      ? 'border-brand-red'
      : 'border-white/20';

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 bg-bg-surface border ${borderColor} rounded-card shadow-lg
        animate-[slideInRight_0.3s_ease-out] min-w-[280px]`}
      style={{
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span className="text-sm font-body text-text-primary flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-text-muted hover:text-text-primary transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
