// Type definitions for the application

export interface User {
  email: string;
  name: string;
  role: 'hr' | 'lead' | 'employee';
}

export interface Session {
  user: User;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  satisfactionScore: number;
  joinDate: string;
}

export interface FeedbackItem {
  id: string;
  employeeId: string;
  employeeName: string;
  feedback: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
  timestamp: Date;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  createdBy: string;
  createdAt: Date;
  data: any;
}
