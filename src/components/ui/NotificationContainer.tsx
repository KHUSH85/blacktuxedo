import React from 'react';
import { Notification, NotificationProps } from './Notification';

interface NotificationContainerProps {
  notifications: NotificationProps[];
  onClose: (id: string) => void;
}

export function NotificationContainer({ notifications, onClose }: NotificationContainerProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center gap-3 p-4 safe-top pointer-events-none">
      <div className="flex flex-col items-center gap-3 pointer-events-auto">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}
