// Note: Activity logging functions are now in db-actions.ts
// These are re-exported here for backwards compatibility

export {
  createActivityLog,
  getActivityLogs,
  getUserActivityLogs,
  clearOldActivityLogs,
} from './db-actions';

// Client-side wrapper for activity logging (use these in components)
export async function logActivity(
  userId: string,
  userName: string,
  action: string,
  description: string,
  metadata?: Record<string, any>
) {
  try {
    const { createActivityLog } = await import('./db-actions');
    await createActivityLog({
      userId,
      userName,
      action,
      description,
      metadata,
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

// Export utility functions
export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(data: any[], filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
