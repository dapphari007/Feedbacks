# Quick Integration Guide

## 🎯 5-Minute Integration Examples

### 1. Add Notifications to Any Action

```tsx
'use client';

import { useNotifications } from '@/contexts/notification-context';
import { Button } from '@/components/ui/button';

export function MyComponent() {
  const { addNotification } = useNotifications();

  const handleSave = async () => {
    try {
      // Your save logic here
      addNotification({
        title: 'Saved!',
        message: 'Your changes have been saved successfully.',
        type: 'success',
      });
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to save changes.',
        type: 'error',
      });
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

### 2. Add Activity Logging to Actions

```tsx
'use client';

import { createActivityLog, saveActivityLog } from '@/lib/activity-utils';
import { useNotifications } from '@/contexts/notification-context';

export function MyComponent({ session }: any) {
  const { addNotification } = useNotifications();

  const handleDelete = async (itemId: string) => {
    // Delete logic here
    
    // Log the activity
    const activity = createActivityLog(
      session.user.email,
      session.user.name,
      'delete',
      `deleted item ${itemId}`,
      { itemId }
    );
    saveActivityLog(activity);

    // Show notification
    addNotification({
      title: 'Deleted',
      message: 'Item has been deleted.',
      type: 'info',
    });
  };

  return <button onClick={() => handleDelete('123')}>Delete</button>;
}
```

### 3. Add Search + Filter + Export to a List Page

```tsx
'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/search-bar';
import { FilterDropdown, FilterOption } from '@/components/filter-dropdown';
import { ExportButton } from '@/components/export-button';

export function EmployeeListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOption[]>([
    { label: 'Engineering', value: 'engineering', checked: false },
    { label: 'Marketing', value: 'marketing', checked: false },
    { label: 'Sales', value: 'sales', checked: false },
  ]);

  // Sample data
  const employees = [
    { id: '1', name: 'John Doe', department: 'engineering', score: 85 },
    { id: '2', name: 'Jane Smith', department: 'marketing', score: 92 },
    { id: '3', name: 'Bob Johnson', department: 'sales', score: 78 },
  ];

  // Apply filters
  const activeFilters = filters.filter(f => f.checked).map(f => f.value);
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      activeFilters.length === 0 || 
      activeFilters.includes(emp.department);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
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
        <ExportButton 
          data={filteredEmployees} 
          filename="employees" 
        />
      </div>

      {/* Display filtered results */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredEmployees.length} of {employees.length} employees
      </div>

      {/* Your table/grid component here */}
      <div className="space-y-2">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className="p-4 border rounded">
            <h3 className="font-semibold">{emp.name}</h3>
            <p className="text-sm text-muted-foreground">{emp.department}</p>
            <p className="text-sm">Score: {emp.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4. Add Stats Cards to Dashboard

```tsx
'use client';

import { StatsCard, StatsGrid } from '@/components/stats-card';
import { Users, TrendingUp, MessageSquare, Award } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <StatsGrid columns={4}>
        <StatsCard
          title="Total Employees"
          value="1,234"
          icon={Users}
          trend={{ value: 12, label: 'from last month' }}
        />
        <StatsCard
          title="Avg Satisfaction"
          value="85.5%"
          icon={TrendingUp}
          trend={{ value: 5.2, label: 'from last quarter' }}
        />
        <StatsCard
          title="Pending Feedback"
          value="23"
          icon={MessageSquare}
          trend={{ value: -15, label: 'from last week' }}
        />
        <StatsCard
          title="Top Performers"
          value="156"
          icon={Award}
          description="Employees with score > 90"
        />
      </StatsGrid>
    </div>
  );
}
```

### 5. Add Activity Log to Dashboard

```tsx
'use client';

import { ActivityLogView } from '@/components/activity-log-view';
import { getActivityLogs } from '@/lib/activity-utils';
import { useEffect, useState } from 'react';

export function DashboardWithActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Load activities (in real app, fetch from API)
    setActivities(getActivityLogs());
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Other dashboard content */}
      
      {/* Activity Log */}
      <ActivityLogView 
        activities={activities.slice(0, 10)} 
        maxHeight="400px" 
      />
    </div>
  );
}
```

### 6. Add Refresh Button

```tsx
'use client';

import { RefreshButton } from '@/components/refresh-button';
import { useState } from 'react';

export function DataPage() {
  const [data, setData] = useState([]);

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Fetch fresh data
    // setData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Data</h1>
        <RefreshButton onRefresh={handleRefresh} />
      </div>
      
      {/* Your data display here */}
    </div>
  );
}
```

### 7. Add Quick Actions Menu

```tsx
'use client';

import { QuickActionsMenu, QuickAction } from '@/components/quick-actions-menu';
import { UserPlus, FileText, Upload, Download } from 'lucide-react';

export function HRDashboard() {
  const actions: QuickAction[] = [
    {
      label: 'Add Employee',
      icon: UserPlus,
      onClick: () => console.log('Add employee'),
      description: 'Create a new employee profile',
    },
    {
      label: 'Generate Report',
      icon: FileText,
      onClick: () => console.log('Generate report'),
      description: 'Create a satisfaction report',
    },
    {
      label: 'Import Data',
      icon: Upload,
      onClick: () => console.log('Import'),
    },
    {
      label: 'Export All',
      icon: Download,
      onClick: () => console.log('Export'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">HR Dashboard</h1>
        <QuickActionsMenu actions={actions} />
      </div>
      
      {/* Dashboard content */}
    </div>
  );
}
```

---

## 📋 Common Patterns

### Pattern 1: Form Submission with Notifications + Activity Log

```tsx
const handleSubmit = async (data: any) => {
  try {
    // Submit data
    await submitData(data);
    
    // Log activity
    const activity = createActivityLog(
      session.user.email,
      session.user.name,
      'create',
      'submitted new feedback'
    );
    saveActivityLog(activity);
    
    // Show success notification
    addNotification({
      title: 'Success!',
      message: 'Feedback submitted successfully.',
      type: 'success',
      actionUrl: '/dashboard',
    });
    
  } catch (error) {
    // Show error notification
    addNotification({
      title: 'Error',
      message: 'Failed to submit feedback.',
      type: 'error',
    });
  }
};
```

### Pattern 2: List Page with All Features

```tsx
// 1. Import all components
import { SearchBar } from '@/components/search-bar';
import { FilterDropdown } from '@/components/filter-dropdown';
import { ExportButton } from '@/components/export-button';
import { RefreshButton } from '@/components/refresh-button';
import { StatsGrid, StatsCard } from '@/components/stats-card';

// 2. Set up state
const [searchQuery, setSearchQuery] = useState('');
const [filters, setFilters] = useState([...]);

// 3. Add control bar
<div className="flex gap-4 items-center">
  <SearchBar value={searchQuery} onChange={setSearchQuery} className="flex-1" />
  <FilterDropdown ... />
  <ExportButton ... />
  <RefreshButton ... />
</div>

// 4. Add stats
<StatsGrid>
  <StatsCard ... />
</StatsGrid>

// 5. Display filtered data
{filteredData.map(...)}
```

---

## 🎨 Styling Tips

All components use Tailwind CSS and are fully customizable:

```tsx
// Add custom className
<SearchBar className="w-full max-w-md" />

// Customize colors
<StatsCard className="bg-gradient-to-br from-blue-500 to-blue-600 text-white" />

// Adjust layout
<StatsGrid columns={3} className="gap-6" />
```

---

## 🚀 Performance Tips

1. **Search**: Debounce search input for better performance
2. **Filters**: Use useMemo for filtering large datasets
3. **Activity Logs**: Limit display to recent items
4. **Notifications**: Auto-dismiss after a few seconds

```tsx
// Debounced search example
import { useMemo } from 'react';

const filteredData = useMemo(() => {
  return data.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [data, searchQuery]);
```

---

## 📱 Responsive Design

All components are mobile-friendly:

```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
  <SearchBar className="flex-1" />
  <FilterDropdown />
  <ExportButton />
</div>

// Adjust grid columns
<StatsGrid columns={2} /> {/* 1 col mobile, 2 cols tablet+ */}
<StatsGrid columns={4} /> {/* 1 col mobile, 2 tablet, 4 desktop */}
```

---

## ✅ Ready to Use!

These components are production-ready and can be copy-pasted into your pages. See `docs/NEW_FEATURES.md` for comprehensive documentation.
