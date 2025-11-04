import { EmployeesPage } from '@/components/employees-page';
import { getSession } from '@/lib/actions';
import { getEmployees, getFeedback } from '@/lib/db-actions';
import { redirect } from 'next/navigation';

export default async function Employees() {
  const session = await getSession();
  if (session?.user?.role !== 'hr') {
    redirect('/login');
  }

  // Fetch employees and feedback from database
  const employeesResult = await getEmployees();
  const employees = employeesResult.success ? employeesResult.employees : [];
  
  const feedbackResult = await getFeedback();
  const feedback = feedbackResult.success ? feedbackResult.feedback : [];

  return (
    <EmployeesPage employees={employees} feedback={feedback} session={session} />
  );
}
