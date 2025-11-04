'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Type imports from Prisma
type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
type SentimentType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

// ==================== NOTIFICATION ACTIONS ====================

export async function createNotification(data: {
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  userId: string;
  actionUrl?: string;
}) {
  try {
    const notification = await prisma.notification.create({
      data: {
        title: data.title,
        message: data.message,
        type: data.type as NotificationType,
        actionUrl: data.actionUrl,
        userId: data.userId,
      },
    });
    revalidatePath('/');
    return { success: true, notification };
  } catch (error) {
    console.error('Failed to create notification:', error);
    return { success: false, error: 'Failed to create notification' };
  }
}

export async function getUserNotifications(userId: string, limit = 50) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return { success: true, notifications };
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return { success: false, error: 'Failed to fetch notifications', notifications: [] };
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    return { success: false, error: 'Failed to update notification' };
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error);
    return { success: false, error: 'Failed to update notifications' };
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    await prisma.notification.delete({
      where: { id: notificationId },
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete notification:', error);
    return { success: false, error: 'Failed to delete notification' };
  }
}

export async function clearAllNotifications(userId: string) {
  try {
    await prisma.notification.deleteMany({
      where: { userId },
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to clear notifications:', error);
    return { success: false, error: 'Failed to clear notifications' };
  }
}

export async function getUnreadNotificationCount(userId: string) {
  try {
    const count = await prisma.notification.count({
      where: { userId, read: false },
    });
    return { success: true, count };
  } catch (error) {
    console.error('Failed to get unread count:', error);
    return { success: false, count: 0 };
  }
}

// ==================== ACTIVITY LOG ACTIONS ====================

export async function createActivityLog(data: {
  action: string;
  description: string;
  userId: string;
  userName: string;
  metadata?: Record<string, any>;
}) {
  try {
    const activity = await prisma.activityLog.create({
      data: {
        action: data.action,
        description: data.description,
        userId: data.userId,
        userName: data.userName,
        metadata: data.metadata || {},
      },
    });
    return { success: true, activity };
  } catch (error) {
    console.error('Failed to create activity log:', error);
    return { success: false, error: 'Failed to create activity log' };
  }
}

export async function getActivityLogs(limit = 100) {
  try {
    const activities = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return { success: true, activities };
  } catch (error) {
    console.error('Failed to fetch activity logs:', error);
    return { success: false, error: 'Failed to fetch activity logs', activities: [] };
  }
}

export async function getUserActivityLogs(userId: string, limit = 50) {
  try {
    const activities = await prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return { success: true, activities };
  } catch (error) {
    console.error('Failed to fetch user activity logs:', error);
    return { success: false, error: 'Failed to fetch activity logs', activities: [] };
  }
}

export async function clearOldActivityLogs(daysToKeep = 90) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const result = await prisma.activityLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });
    return { success: true, deletedCount: result.count };
  } catch (error) {
    console.error('Failed to clear old activity logs:', error);
    return { success: false, error: 'Failed to clear old activity logs' };
  }
}

// ==================== EMPLOYEE ACTIONS ====================

export async function createEmployee(data: {
  name: string;
  email: string;
  department: string;
  position: string;
  satisfactionScore?: number;
  joinDate?: Date;
}) {
  try {
    const employee = await prisma.employee.create({
      data: {
        name: data.name,
        email: data.email,
        department: data.department,
        position: data.position,
        satisfactionScore: data.satisfactionScore || 0,
        joinDate: data.joinDate || new Date(),
      },
    });
    revalidatePath('/hr-dashboard/employees');
    return { success: true, employee };
  } catch (error) {
    console.error('Failed to create employee:', error);
    return { success: false, error: 'Failed to create employee' };
  }
}

export async function getEmployees(filters?: {
  department?: string;
  search?: string;
}) {
  try {
    const where: any = {};
    
    if (filters?.department) {
      where.department = filters.department;
    }
    
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { position: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    
    const employees = await prisma.employee.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        feedback: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return { success: true, employees };
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    return { success: false, error: 'Failed to fetch employees', employees: [] };
  }
}

export async function updateEmployee(
  employeeId: string,
  data: {
    name?: string;
    email?: string;
    department?: string;
    position?: string;
    satisfactionScore?: number;
  }
) {
  try {
    const employee = await prisma.employee.update({
      where: { id: employeeId },
      data,
    });
    revalidatePath('/hr-dashboard/employees');
    return { success: true, employee };
  } catch (error) {
    console.error('Failed to update employee:', error);
    return { success: false, error: 'Failed to update employee' };
  }
}

export async function deleteEmployee(employeeId: string) {
  try {
    await prisma.employee.delete({
      where: { id: employeeId },
    });
    revalidatePath('/hr-dashboard/employees');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete employee:', error);
    return { success: false, error: 'Failed to delete employee' };
  }
}

// ==================== FEEDBACK ACTIONS ====================

export async function createFeedback(data: {
  feedback: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  category: string;
  employeeId: string;
  authorId: string;
}) {
  try {
    const feedbackEntry = await prisma.feedback.create({
      data: {
        feedback: data.feedback,
        sentiment: data.sentiment as SentimentType,
        category: data.category,
        employeeId: data.employeeId,
        authorId: data.authorId,
      },
      include: {
        employee: true,
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    revalidatePath('/lead-dashboard/feedback');
    return { success: true, feedback: feedbackEntry };
  } catch (error) {
    console.error('Failed to create feedback:', error);
    return { success: false, error: 'Failed to create feedback' };
  }
}

export async function getFeedback(filters?: {
  employeeId?: string;
  sentiment?: string;
  category?: string;
  search?: string;
}) {
  try {
    const where: any = {};
    
    if (filters?.employeeId) {
      where.employeeId = filters.employeeId;
    }
    
    if (filters?.sentiment) {
      where.sentiment = filters.sentiment;
    }
    
    if (filters?.category) {
      where.category = filters.category;
    }
    
    if (filters?.search) {
      where.feedback = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }
    
    const feedback = await prisma.feedback.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
          },
        },
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return { success: true, feedback };
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    return { success: false, error: 'Failed to fetch feedback', feedback: [] };
  }
}

export async function deleteFeedback(feedbackId: string) {
  try {
    await prisma.feedback.delete({
      where: { id: feedbackId },
    });
    revalidatePath('/lead-dashboard/feedback');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete feedback:', error);
    return { success: false, error: 'Failed to delete feedback' };
  }
}

// ==================== REPORT ACTIONS ====================

export async function createReport(data: {
  title: string;
  type: string;
  data: Record<string, any>;
  createdById: string;
}) {
  try {
    const report = await prisma.report.create({
      data: {
        title: data.title,
        type: data.type,
        data: data.data,
        createdById: data.createdById,
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    revalidatePath('/hr-dashboard/reports');
    return { success: true, report };
  } catch (error) {
    console.error('Failed to create report:', error);
    return { success: false, error: 'Failed to create report' };
  }
}

export async function getReports(filters?: {
  type?: string;
  createdById?: string;
}) {
  try {
    const where: any = {};
    
    if (filters?.type) {
      where.type = filters.type;
    }
    
    if (filters?.createdById) {
      where.createdById = filters.createdById;
    }
    
    const reports = await prisma.report.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return { success: true, reports };
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return { success: false, error: 'Failed to fetch reports', reports: [] };
  }
}

export async function deleteReport(reportId: string) {
  try {
    await prisma.report.delete({
      where: { id: reportId },
    });
    revalidatePath('/hr-dashboard/reports');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete report:', error);
    return { success: false, error: 'Failed to delete report' };
  }
}

// ==================== USER ACTIONS ====================

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return { success: true, user };
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return { success: false, error: 'Failed to fetch user', user: null };
  }
}

export async function createUser(data: {
  email: string;
  name: string;
  role: 'HR' | 'LEAD' | 'EMPLOYEE';
}) {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

export async function getOrCreateUser(data: {
  email: string;
  name: string;
  role: 'HR' | 'LEAD' | 'EMPLOYEE';
}) {
  try {
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {}, // Don't update anything if user exists
      create: {
        email: data.email,
        name: data.name,
        role: data.role,
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error('Failed to get or create user:', error);
    return { success: false, error: 'Failed to get or create user' };
  }
}
