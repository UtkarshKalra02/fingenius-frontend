'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  UploadCloud,
  BarChart2,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Chat', icon: MessageSquare, href: '/chat' },
  { label: 'Upload', icon: UploadCloud, href: '/upload' },
  { label: 'Insights', icon: BarChart2, href: '/insights' },
  // { label: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r px-6 py-8 hidden md:block shadow-sm">
      <Link href="/" className="block mb-10">
        <h2 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          FinGenius
        </h2>
      </Link>

      <ul className="space-y-6 text-gray-700 text-sm font-medium">
        {menuItems.map(({ label, icon: Icon, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`flex items-center gap-3 px-1.5 py-1 rounded transition-colors ${
                pathname.startsWith(href)
                  ? 'text-blue-600 font-semibold'
                  : 'hover:text-blue-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}