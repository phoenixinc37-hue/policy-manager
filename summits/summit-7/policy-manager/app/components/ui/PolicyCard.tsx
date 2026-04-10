import Link from "next/link";
import type { CommunicationType } from "@/types";
import { TYPE_LABELS, TYPE_BADGE_CLASS } from "@/types";

interface PolicyCardProps {
  id: string;
  title: string;
  type: CommunicationType;
  category: string;
  clinic: string;
  date: string;
}

export default function PolicyCard({
  id,
  title,
  type,
  category,
  clinic,
  date,
}: PolicyCardProps) {
  const badge = TYPE_BADGE_CLASS[type];
  const label = TYPE_LABELS[type];

  return (
    <Link href={`/policy/${id}`} className="card hover:shadow-md transition-shadow block">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className={badge}>{label}</span>
          <h3 className="mt-2 font-medium text-gray-900 truncate">{title}</h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <span>{clinic}</span>
            <span>&middot;</span>
            <span>{category}</span>
            <span>&middot;</span>
            <span>{date}</span>
          </div>
        </div>
        <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  );
}
