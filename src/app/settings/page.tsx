import { SettingsPage } from '@/components/settings-page';
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function Settings() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <SettingsPage />
  );
}
