import Sidebar from "@/components/layout/Sidebar";
import { AppProvider } from "@/lib/app-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">{children}</main>
      </div>
    </AppProvider>
  );
}
