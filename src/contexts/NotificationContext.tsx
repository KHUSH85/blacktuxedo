import React, { createContext, useContext, useState, useCallback } from 'react';
// 1. We import the Notification component here instead of using 'require' later
import { Notification, NotificationProps } from '../components/ui/Notification';

interface NotificationContextType {
  showNotification: (notification: Omit<NotificationProps, 'id' | 'onClose'>) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const removeNotification = useCallback((id: string) => {
    // Note: We type 'prev' explicitly to fix the implicit any error
    setNotifications((prev: NotificationProps[]) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback((notification: Omit<NotificationProps, 'id' | 'onClose'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification: NotificationProps = {
      ...notification,
      id,
      onClose: removeNotification,
    };
    setNotifications((prev: NotificationProps[]) => [...prev, newNotification]);
  }, [removeNotification]);

  const showSuccess = useCallback((title: string, message?: string) => {
    showNotification({ type: 'success', title, message });
  }, [showNotification]);

  const showError = useCallback((title: string, message?: string) => {
    showNotification({ type: 'error', title, message });
  }, [showNotification]);

  const showWarning = useCallback((title: string, message?: string) => {
    showNotification({ type: 'warning', title, message });
  }, [showNotification]);

  const showInfo = useCallback((title: string, message?: string) => {
    showNotification({ type: 'info', title, message });
  }, [showNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification, showSuccess, showError, showWarning, showInfo }}>
      {children}
      {/* Render notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center gap-3 p-4 safe-top pointer-events-none">
          <div className="flex flex-col items-center gap-3 pointer-events-auto">
            {notifications.map((notification) => (
              // 2. Use the imported component directly
              <Notification key={notification.id} {...notification} />
            ))}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}