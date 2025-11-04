/**
 * Integration Examples for New Features
 * 
 * This file demonstrates how to use the new features added to PulseCheck:
 * 1. Notification System
 * 2. Activity Logging
 * 3. Export Functionality
 * 4. Search and Filter Components
 */

// ==================== NOTIFICATION SYSTEM ====================

// Example 1: Sending a notification from a component
import { useNotifications } from '@/contexts/notification-context';

function MyComponent() {
  const { addNotification } = useNotifications();

  const handleAction = () => {
    // Add a success notification
    addNotification({
      title: 'Success!',
      message: 'Employee data has been updated successfully.',
      type: 'success',
      actionUrl: '/hr-dashboard/employees', // Optional: redirect when clicked
    });
  };

  // Different notification types
  const examples = () => {
    // Info notification
    addNotification({
      title: 'New Feature',
      message: 'Check out the new reporting dashboard!',
      type: 'info',
    });

    // Warning notification
    addNotification({
      title: 'Attention Required',
      message: 'Please review pending feedback submissions.',
      type: 'warning',
      actionUrl: '/lead-dashboard/feedback',
    });

    // Error notification
    addNotification({
      title: 'Error',
      message: 'Failed to save changes. Please try again.',
      type: 'error',
    });
  };
}

// ==================== ACTIVITY LOGGING ====================

// Example 2: Logging user activities
import { createActivityLog, saveActivityLog } from '@/lib/activity-utils';

function logUserActivity(session: any) {
  // Create and save an activity log
  const activity = createActivityLog(
    session.user.email,
    session.user.name,
    'create',
    'created a new employee report',
    { reportId: '123', department: 'Engineering' }
  );
  
  saveActivityLog(activity);
}

// Example usage in different scenarios
function activityExamples(user: any) {
  // Login activity
  const loginActivity = createActivityLog(
    user.email,
    user.name,
    'login',
    'logged into the system'
  );
  saveActivityLog(loginActivity);

  // Update activity
  const updateActivity = createActivityLog(
    user.email,
    user.name,
    'update',
    'updated employee satisfaction score',
    { employeeId: 'emp-123', newScore: 85 }
  );
  saveActivityLog(updateActivity);

  // Delete activity
  const deleteActivity = createActivityLog(
    user.email,
    user.name,
    'delete',
    'removed outdated feedback entry',
    { feedbackId: 'fb-456' }
  );
  saveActivityLog(deleteActivity);
}

// ==================== DISPLAYING ACTIVITY LOGS ====================

// Example 3: Displaying activity logs in a component
import { ActivityLogView } from '@/components/activity-log-view';
import { getActivityLogs } from '@/lib/activity-utils';

function DashboardWithActivity() {
  const activities = getActivityLogs();

  return (
    <div>
      <ActivityLogView activities={activities} maxHeight="500px" />
    </div>
  );
}

// ==================== EXPORT FUNCTIONALITY ====================

// Example 4: Using the export button
import { ExportButton } from '@/components/export-button';

function EmployeeList() {
  const employees = [
    { id: '1', name: 'John Doe', department: 'Engineering', score: 85 },
    { id: '2', name: 'Jane Smith', department: 'Marketing', score: 92 },
  ];

  return (
    <div>
      <ExportButton 
        data={employees} 
        filename="employees" 
        disabled={employees.length === 0}
      />
    </div>
  );
}

// ==================== SEARCH FUNCTIONALITY ====================

// Example 5: Using the search bar
import { SearchBar } from '@/components/search-bar';
import { useState } from 'react';

function SearchableEmployeeList() {
  const [searchQuery, setSearchQuery] = useState('');
  const employees = [
    { id: '1', name: 'John Doe', department: 'Engineering' },
    { id: '2', name: 'Jane Smith', department: 'Marketing' },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search employees..."
        className="mb-4"
      />
      {/* Render filteredEmployees */}
    </div>
  );
}

// ==================== FILTER FUNCTIONALITY ====================

// Example 6: Using the filter dropdown
import { FilterDropdown, FilterOption } from '@/components/filter-dropdown';

function FilterableEmployeeList() {
  const [departmentFilters, setDepartmentFilters] = useState<FilterOption[]>([
    { label: 'Engineering', value: 'engineering', checked: false },
    { label: 'Marketing', value: 'marketing', checked: false },
    { label: 'Sales', value: 'sales', checked: false },
  ]);

  const handleFilterChange = (value: string, checked: boolean) => {
    setDepartmentFilters(prev =>
      prev.map(filter =>
        filter.value === value ? { ...filter, checked } : filter
      )
    );
  };

  const handleClearFilters = () => {
    setDepartmentFilters(prev =>
      prev.map(filter => ({ ...filter, checked: false }))
    );
  };

  const employees = [
    { id: '1', name: 'John Doe', department: 'engineering' },
    { id: '2', name: 'Jane Smith', department: 'marketing' },
  ];

  // Apply filters
  const activeDepartments = departmentFilters
    .filter(f => f.checked)
    .map(f => f.value);
  
  const filteredEmployees = activeDepartments.length > 0
    ? employees.filter(emp => activeDepartments.includes(emp.department))
    : employees;

  return (
    <div>
      <FilterDropdown
        title="Department"
        options={departmentFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearFilters}
      />
      {/* Render filteredEmployees */}
    </div>
  );
}

// ==================== COMBINED EXAMPLE ====================

// Example 7: Complete integration with all features
'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/search-bar';
import { FilterDropdown, FilterOption } from '@/components/filter-dropdown';
import { ExportButton } from '@/components/export-button';
import { ActivityLogView } from '@/components/activity-log-view';
import { useNotifications } from '@/contexts/notification-context';
import { createActivityLog, saveActivityLog, getActivityLogs } from '@/lib/activity-utils';

export function EnhancedEmployeePage({ session }: { session: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOption[]>([
    { label: 'Engineering', value: 'engineering', checked: false },
    { label: 'Marketing', value: 'marketing', checked: false },
    { label: 'Sales', value: 'sales', checked: false },
  ]);
  
  const { addNotification } = useNotifications();
  const activities = getActivityLogs();

  const employees = [
    { id: '1', name: 'John Doe', department: 'engineering', score: 85 },
    { id: '2', name: 'Jane Smith', department: 'marketing', score: 92 },
  ];

  // Filter employees
  const activeFilters = filters.filter(f => f.checked).map(f => f.value);
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(emp.department);
    return matchesSearch && matchesFilter;
  });

  const handleExportClick = () => {
    // Log activity
    const activity = createActivityLog(
      session.user.email,
      session.user.name,
      'export',
      'exported employee data'
    );
    saveActivityLog(activity);

    // Show notification
    addNotification({
      title: 'Export Started',
      message: 'Employee data is being exported...',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
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
        <div onClick={handleExportClick}>
          <ExportButton data={filteredEmployees} filename="employees" />
        </div>
      </div>

      {/* Employee List */}
      <div>
        {/* Render your employee table/grid here */}
      </div>

      {/* Activity Log */}
      <ActivityLogView activities={activities.slice(0, 10)} />
    </div>
  );
}

export default EnhancedEmployeePage;
