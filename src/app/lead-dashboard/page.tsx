import { LeadDashboardPage } from '@/components/lead-dashboard-page';
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function LeadDashboard() {
  const session = await getSession();
  if (session?.user?.role !== 'lead') {
    redirect('/login');
  }

  return (
    <LeadDashboardPage />
  );
}
