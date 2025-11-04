import { ReportsPage } from '@/components/reports-page';
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function Reports() {
  const session = await getSession();
  if (session?.user?.role !== 'hr') {
    redirect('/login');
  }

  return (
    <ReportsPage />
  );
}
