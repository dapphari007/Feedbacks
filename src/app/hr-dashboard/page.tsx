import { DashboardPage } from '@/components/dashboard-page';
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function HrDashboard() {
  const session = await getSession();
  if (session?.user?.role !== 'hr') {
    redirect('/login');
  }

  return (
    <DashboardPage />
  );
}
