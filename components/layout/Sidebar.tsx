"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { users } from "@/lib/mock-data";
import { ROLE_LABELS } from "@/types";

const staffNav = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" },
  { label: "Library", href: "/library", icon: "book" },
  { label: "Acknowledgments", href: "/acknowledgments", icon: "check-circle" },
];

const managerNav = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" },
  { label: "Library", href: "/library", icon: "book" },
  { label: "Manager", href: "/manager", icon: "bar-chart" },
  { label: "Acknowledgments", href: "/acknowledgments", icon: "check-circle" },
];

const icons: Record<string, React.ReactNode> = {
  grid: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  book: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  "check-circle": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "bar-chart": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser, setCurrentUser, isManager } = useApp();
  const navItems = isManager ? managerNav : staffNav;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-surface-border bg-white min-h-screen">
        <div className="p-4 border-b border-surface-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <span className="font-semibold text-gray-900">Policy Manager</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {icons[item.icon]}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Role switcher */}
        <div className="px-3 pb-2">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 px-3 mb-1">Demo: Switch User</p>
          <select
            value={currentUser.id}
            onChange={(e) => {
              const u = users.find((u) => u.id === e.target.value);
              if (u) setCurrentUser(u);
            }}
            className="w-full px-2 py-1.5 text-xs border border-surface-border rounded-lg bg-gray-50 text-gray-600"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({ROLE_LABELS[u.role]})
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 border-t border-surface-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
              {currentUser.initials}
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-gray-400 text-xs">{ROLE_LABELS[currentUser.role]}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-border z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
                  active ? "text-brand-600" : "text-gray-400"
                }`}
              >
                {icons[item.icon]}
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
