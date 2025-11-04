import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();
  if (!session?.user?.role) {
    redirect('/login');
  }

  const { role } = session.user;

  if (role === 'hr') {
    redirect('/hr-dashboard');
  } else if (role === 'lead') {
    redirect('/lead-dashboard');
  } else if (role === 'employee') {
    redirect('/employee-dashboard');
  } else {
    redirect('/login');
  }
}
