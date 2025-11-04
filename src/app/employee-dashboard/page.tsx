import { EmployeeDashboardPage } from '@/components/employee-dashboard-page';
import { getSession } from '@/lib/actions';
import { getEmployees, getFeedback } from '@/lib/db-actions';
import { redirect } from 'next/navigation';

export default async function EmployeeDashboard() {
  const session = await getSession();
  if (session?.user?.role !== 'employee') {
    redirect('/login');
  }

  // Fetch employees to find the current employee's record
  const employeesResult = await getEmployees();
  const employees = employeesResult.success ? employeesResult.employees : [];
  
  // Find current employee by email
  const currentEmployee = employees.find((emp: any) => emp.email === session?.user?.email);

  // Fetch feedback about the current employee
  const feedbackResult = await getFeedback();
  const allFeedback = feedbackResult.success ? feedbackResult.feedback : [];
  
  // Filter to show only feedback about the current user
  const myFeedback = allFeedback.filter((f: any) => f.employee.email === session?.user?.email);

  return (
    <EmployeeDashboardPage 
      employeeId={currentEmployee?.id || ''}
      session={session} 
      myFeedback={myFeedback}
    />
  );
}
