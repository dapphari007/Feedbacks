# New Features Documentation

## Overview
This document describes the new features added to PulseCheck, including the notification system, activity logging, export functionality, and search/filter capabilities.

---

## 1. Notification System

### Features
- **Real-time notifications** with bell icon in header
- **Multiple notification types**: info, success, warning, error
- **Persistent storage** using localStorage
- **Mark as read/unread** functionality
- **Action URLs** for clickable notifications
- **Auto-cleanup** (keeps last 50 notifications)

### Usage

#### Adding Notifications
```tsx
import { useNotifications } from '@/contexts/notification-context';

function MyComponent() {
  const { addNotification } = useNotifications();

  const handleSuccess = () => {
    addNotification({
      title: 'Success!',
      message: 'Your changes have been saved.',
      type: 'success',
      actionUrl: '/dashboard', // Optional
    });
  };
}
```

#### Notification Types
- `info` - Blue notification for general information
- `success` - Green notification for successful actions
- `warning` - Yellow notification for warnings
- `error` - Red notification for errors

### Components
- **NotificationCenter**: Bell icon with dropdown in header
- **NotificationProvider**: Context provider (already added to root layout)

---

## 2. Activity Logging

### Features
- **Automatic activity tracking** for user actions
- **Persistent storage** using localStorage
- **Rich metadata** support
- **Activity categorization** (create, update, delete, login, etc.)
- **Timeline view** with color-coded badges
- **Auto-cleanup** (keeps last 100 activities)

### Usage

#### Logging Activities
```tsx
import { createActivityLog, saveActivityLog } from '@/lib/activity-utils';

function logActivity(user: any) {
  const activity = createActivityLog(
    user.email,
    user.name,
    'create',
    'created a new report',
    { reportId: '123' } // Optional metadata
  );
  saveActivityLog(activity);
}
```

#### Displaying Activity Logs
```tsx
import { ActivityLogView } from '@/components/activity-log-view';
import { getActivityLogs } from '@/lib/activity-utils';

function Dashboard() {
  const activities = getActivityLogs();
  
  return <ActivityLogView activities={activities} maxHeight="400px" />;
}
```

### Activity Actions
- `create` / `add` - Green badge
- `update` / `edit` - Blue badge
- `delete` / `remove` - Red badge
- `login` / `logout` - Purple badge
- Others - Gray badge

---

## 3. Export Functionality

### Features
- **Multiple formats**: CSV and JSON
- **Automatic filename generation** with timestamp
- **Toast notifications** for success/error feedback
- **Data validation** before export
- **Browser-based** (no server required)

### Usage

#### Export Button
```tsx
import { ExportButton } from '@/components/export-button';

function DataTable() {
  const data = [
    { id: 1, name: 'John', score: 85 },
    { id: 2, name: 'Jane', score: 92 },
  ];

  return (
    <ExportButton 
      data={data} 
      filename="employees" 
      disabled={data.length === 0}
    />
  );
}
```

#### Manual Export
```tsx
import { exportToCSV, exportToJSON } from '@/lib/activity-utils';

// Export to CSV
exportToCSV(data, 'filename.csv');

// Export to JSON
exportToJSON(data, 'filename.json');
```

### File Naming
Files are automatically named with format: `{filename}-{YYYY-MM-DD}.{ext}`
Example: `employees-2025-11-04.csv`

---

## 4. Search and Filter

### Features
- **Real-time search** with instant filtering
- **Multi-criteria filtering** with checkboxes
- **Clear filters** functionality
- **Active filter count** badge
- **Keyboard accessible**
- **Responsive design**

### Usage

#### Search Bar
```tsx
import { SearchBar } from '@/components/search-bar';
import { useState } from 'react';

function SearchableList() {
  const [query, setQuery] = useState('');

  return (
    <SearchBar
      value={query}
      onChange={setQuery}
      placeholder="Search..."
      className="mb-4"
    />
  );
}
```

#### Filter Dropdown
```tsx
import { FilterDropdown, FilterOption } from '@/components/filter-dropdown';
import { useState } from 'react';

function FilterableList() {
  const [filters, setFilters] = useState<FilterOption[]>([
    { label: 'Engineering', value: 'eng', checked: false },
    { label: 'Marketing', value: 'mkt', checked: false },
  ]);

  return (
    <FilterDropdown
      title="Department"
      options={filters}
      onFilterChange={(value, checked) => {
        setFilters(prev =>
          prev.map(f => f.value === value ? { ...f, checked } : f)
        );
      }}
      onClearAll={() => {
        setFilters(prev => prev.map(f => ({ ...f, checked: false })));
      }}
    />
  );
}
```

---

## Complete Integration Example

Here's a complete example showing all features working together:

```tsx
'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/search-bar';
import { FilterDropdown, FilterOption } from '@/components/filter-dropdown';
import { ExportButton } from '@/components/export-button';
import { ActivityLogView } from '@/components/activity-log-view';
import { useNotifications } from '@/contexts/notification-context';
import { createActivityLog, saveActivityLog, getActivityLogs } from '@/lib/activity-utils';

export function EmployeePage({ session }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOption[]>([
    { label: 'Engineering', value: 'engineering', checked: false },
    { label: 'Marketing', value: 'marketing', checked: false },
  ]);
  
  const { addNotification } = useNotifications();
  const activities = getActivityLogs();

  const employees = [
    { id: '1', name: 'John Doe', department: 'engineering' },
    { id: '2', name: 'Jane Smith', department: 'marketing' },
  ];

  // Apply filters
  const activeFilters = filters.filter(f => f.checked).map(f => f.value);
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(emp.department);
    return matchesSearch && matchesFilter;
  });

  const handleAction = () => {
    // Log activity
    const activity = createActivityLog(
      session.user.email,
      session.user.name,
      'update',
      'updated employee list'
    );
    saveActivityLog(activity);

    // Show notification
    addNotification({
      title: 'Success',
      message: 'Employee list updated successfully',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search employees..."
          className="flex-1"
        />
        <FilterDropdown
          title="Department"
          options={filters}
          onFilterChange={(value, checked) => {
            setFilters(prev =>
              prev.map(f => f.value === value ? { ...f, checked } : f)
            );
          }}
          onClearAll={() => {
            setFilters(prev => prev.map(f => ({ ...f, checked: false })));
          }}
        />
        <ExportButton data={filteredEmployees} filename="employees" />
      </div>

      {/* Your content here */}
      
      {/* Activity Log */}
      <ActivityLogView activities={activities.slice(0, 10)} />
    </div>
  );
}
```

---

## Tips and Best Practices

### Notifications
- Use appropriate notification types to convey meaning
- Keep messages concise and actionable
- Add actionUrl for notifications that should navigate somewhere
- Don't spam notifications for every minor action

### Activity Logging
- Log important user actions (create, update, delete)
- Include relevant metadata for context
- Don't log every single interaction (e.g., hovering, scrolling)
- Review logs periodically to understand user behavior

### Export
- Validate data before exporting
- Use descriptive filenames
- Consider data sensitivity (don't export sensitive info)
- Provide feedback with toast notifications

### Search & Filter
- Debounce search queries for better performance
- Provide clear filter labels
- Show active filter count
- Allow clearing all filters at once

---

## File Structure

```
src/
├── components/
│   ├── activity-log-view.tsx          # Activity log display
│   ├── export-button.tsx              # Export dropdown button
│   ├── filter-dropdown.tsx            # Filter component
│   ├── notification-center.tsx        # Notification bell dropdown
│   ├── search-bar.tsx                 # Search input component
│   └── examples/
│       └── feature-integration-examples.tsx  # Usage examples
├── contexts/
│   └── notification-context.tsx       # Notification state management
└── lib/
    ├── activity-utils.ts              # Activity logging utilities
    └── types.ts                       # TypeScript type definitions
```

---

## Browser Support

All features use standard browser APIs and are supported in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

LocalStorage is required for persistence.
