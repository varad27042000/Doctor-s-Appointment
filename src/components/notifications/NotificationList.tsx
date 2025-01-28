import React from 'react';
import { Bell, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface Notification {
  id: string;
  type: 'appointment' | 'reminder' | 'alert';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
}

const notificationIcons = {
  appointment: Calendar,
  reminder: Clock,
  alert: AlertCircle
};

const notificationVariants = {
  appointment: 'info',
  reminder: 'warning',
  alert: 'error'
} as const;

export function NotificationList({ notifications, onNotificationClick }: NotificationListProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No notifications</p>
        ) : (
          notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];
            return (
              <div
                key={notification.id}
                onClick={() => onNotificationClick(notification.id)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                      </div>
                      <Badge variant={notificationVariants[notification.type]}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">{notification.date}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}