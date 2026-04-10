"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { users } from "@/lib/mock-data";
import { ROLE_LABELS } from "@/types";
import { BookOpen, CheckCircle2, LayoutDashboard, Shield, BarChart3 } from "lucide-react";

const staffNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Library", href: "/library", icon: BookOpen },
  { label: "Acknowledgments", href: "/acknowledgments", icon: CheckCircle2 },
];

const managerNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Library", href: "/library", icon: BookOpen },
  { label: "Manager", href: "/manager", icon: BarChart3 },
  { label: "Acknowledgments", href: "/acknowledgments", icon: CheckCircle2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser, setCurrentUser, isManager, policies, acknowledgments } = useApp();
  const navItems = isManager ? managerNav : staffNav;
  const pendingAcks = acknowledgments.filter((ack) => ack.userId === currentUser.id && !ack.acknowledgedAt).length;
  const published = policies.filter((policy) => policy.status === "published").length;

  return (
    <>
      <aside className="hidden min-h-screen w-72 flex-col border-r border-slate-200 bg-white/90 md:flex">
        <div className="border-b border-slate-200 p-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-200">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Policy Manager</p>
              <p className="text-xs text-slate-500">Rosslyn Veterinary Group</p>
            </div>
          </Link>
        </div>

        <div className="p-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white shadow-xl shadow-slate-200/70">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Live demo</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-2xl font-semibold">{published}</p>
                <p className="text-xs text-slate-400">published docs</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{pendingAcks}</p>
                <p className="text-xs text-slate-400">pending reads</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 pb-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Workspace</p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-cyan-50 text-cyan-900 ring-1 ring-cyan-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {item.href === "/acknowledgments" && pendingAcks > 0 ? (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">{pendingAcks}</span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-slate-200 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Demo persona</p>
          <select
            value={currentUser.id}
            onChange={(e) => {
              const selectedUser = users.find((user) => user.id === e.target.value);
              if (selectedUser) setCurrentUser(selectedUser);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({ROLE_LABELS[user.role]})
              </option>
            ))}
          </select>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
              {currentUser.initials}
            </div>
            <div>
              <p className="font-medium text-slate-900">{currentUser.name}</p>
              <p className="text-xs text-slate-500">{ROLE_LABELS[currentUser.role]}</p>
            </div>
          </div>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-[70px] flex-col items-center gap-1 rounded-xl px-2 py-1 text-xs font-medium ${
                  active ? "text-cyan-700" : "text-slate-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
