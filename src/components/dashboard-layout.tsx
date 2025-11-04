import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { NotificationInitializer } from '@/components/notification-initializer';
import { getSession } from '@/lib/actions';

export async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <NotificationInitializer session={session} />
      <Header user={session?.user} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
