'use client';

import { Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ActivityLog } from '@/lib/types';

interface ActivityLogViewProps {
  activities: ActivityLog[];
  maxHeight?: string;
}

export function ActivityLogView({ activities, maxHeight = '400px' }: ActivityLogViewProps) {
  const getActivityColor = (action: string) => {
    if (action.includes('create') || action.includes('add')) return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (action.includes('delete') || action.includes('remove')) return 'bg-red-500/10 text-red-500 border-red-500/20';
    if (action.includes('update') || action.includes('edit')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    if (action.includes('login') || action.includes('logout')) return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Track recent actions and changes in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea style={{ height: maxHeight }}>
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <Activity className="h-12 w-12 mb-2 opacity-20" />
              <p className="text-sm">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-3 pb-4 border-b last:border-0">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getActivityColor(activity.action)}>
                        {activity.action}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.userName}</span>
                      {' '}
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
