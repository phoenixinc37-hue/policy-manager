import Link from "next/link";
import type { CommunicationType } from "@/types";
import { TYPE_LABELS, TYPE_BADGE_CLASS } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface PolicyCardProps {
  id: string;
  title: string;
  type: CommunicationType;
  category: string;
  clinic: string;
  date: string;
  status?: string;
}

export default function PolicyCard({ id, title, type, category, clinic, date, status }: PolicyCardProps) {
  return (
    <Link href={`/policy/${id}`} className="card block transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={TYPE_BADGE_CLASS[type]}>{TYPE_LABELS[type]}</span>
            {status ? (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{status}</span>
            ) : null}
          </div>
          <h3 className="mt-3 text-base font-semibold text-slate-900 sm:text-lg">{title}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
            <span>{clinic}</span>
            <span>&middot;</span>
            <span>{category}</span>
            <span>&middot;</span>
            <span>Updated {date}</span>
          </div>
        </div>
        <div className="rounded-full bg-slate-50 p-2 text-slate-400">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
