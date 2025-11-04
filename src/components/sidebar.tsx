import { getSession } from '@/lib/actions';
import { Home, Users, FileText, Settings, User } from 'lucide-react';
import { NavLink } from './nav-link';

export async function Sidebar() {
  const session = await getSession();
  const role = session?.user?.role;

  const navItems = {
    hr: [
      { href: '/hr-dashboard', icon: Home, label: 'Overview' },
      { href: '/hr-dashboard/employees', icon: Users, label: 'Employees' },
      { href: '/hr-dashboard/reports', icon: FileText, label: 'Reports' },
    ],
    lead: [
      { href: '/lead-dashboard', icon: Users, label: 'My Team' },
      { href: '/lead-dashboard/feedback', icon: FileText, label: 'Feedback' },
    ],
    employee: [
      { href: '/employee-dashboard', icon: User, label: 'My Feedback' },
    ],
  };

  const currentNavItems = navItems[role as keyof typeof navItems] || [];

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-background p-4 md:block">
      <div className="flex h-full flex-col">
        <nav className="flex-grow">
          <ul className="space-y-2">
            {currentNavItems.map((item) => (
              <li key={item.label}>
                <NavLink href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <ul className="space-y-1">
             <li>
                <NavLink href="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </NavLink>
              </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
