'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification as deleteNotificationAction,
  clearAllNotifications,
  getUnreadNotificationCount,
} from '@/lib/db-actions';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  actionUrl?: string | null;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  unreadCount: number;
  refreshNotifications: () => Promise<void>;
  userId?: string;
  setUserId: (userId: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userId, setUserId] = useState<string | undefined>();

  const refreshNotifications = useCallback(async () => {
    if (!userId) return;
    
    const result = await getUserNotifications(userId);
    if (result.success && result.notifications) {
      setNotifications(result.notifications.map((n: any) => ({
        ...n,
        type: n.type as 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR',
      })));
    }
    
    const countResult = await getUnreadNotificationCount(userId);
    if (countResult.success) {
      setUnreadCount(countResult.count);
    }
  }, [userId]);

  // Load notifications when userId is set
  useEffect(() => {
    if (userId) {
      refreshNotifications();
    }
  }, [userId, refreshNotifications]);

  const addNotification = useCallback(async (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    if (!userId) {
      console.error('Cannot add notification: userId not set');
      return;
    }

    const result = await createNotification({
      ...notification,
      actionUrl: notification.actionUrl || undefined,
      userId,
    });

    if (result.success) {
      await refreshNotifications();
    }
  }, [userId, refreshNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    const result = await markNotificationAsRead(id);
    if (result.success) {
      await refreshNotifications();
    }
  }, [refreshNotifications]);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    
    const result = await markAllNotificationsAsRead(userId);
    if (result.success) {
      await refreshNotifications();
    }
  }, [userId, refreshNotifications]);

  const deleteNotification = useCallback(async (id: string) => {
    const result = await deleteNotificationAction(id);
    if (result.success) {
      await refreshNotifications();
    }
  }, [refreshNotifications]);

  const clearAll = useCallback(async () => {
    if (!userId) return;
    
    const result = await clearAllNotifications(userId);
    if (result.success) {
      await refreshNotifications();
    }
  }, [userId, refreshNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        unreadCount,
        refreshNotifications,
        userId,
        setUserId,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
