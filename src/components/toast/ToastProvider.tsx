"use client";
import React, { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

export type Toast = { id: string; title?: string; description: string; variant?: 'default' | 'success' | 'error'; duration?: number };

interface ToastContextValue {
  push: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    const toast: Toast = { duration: 4000, variant: 'default', ...t, id };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), toast.duration);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
          {toasts.map(t => (
            <div key={t.id} className={`rounded-md border p-3 text-sm shadow bg-white dark:bg-neutral-900 ${t.variant === 'success' ? 'border-green-300' : t.variant === 'error' ? 'border-red-300' : 'border-neutral-200'}`}>
              {t.title && <div className="font-medium mb-1">{t.title}</div>}
              <div>{t.description}</div>
            </div>
          ))}
        </div>, document.body)}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
