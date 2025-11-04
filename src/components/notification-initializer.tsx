'use client';

import { useEffect } from 'react';
import { useNotifications } from '@/contexts/notification-context';

interface UserSession {
  user: {
    id?: string;
    email: string;
    name: string;
    role: string;
  };
}

export function NotificationInitializer({ session }: { session: UserSession | null }) {
  const { setUserId } = useNotifications();

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session, setUserId]);

  return null;
}
