interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  tone?: "default" | "success" | "warning" | "dark";
}

const toneClasses = {
  default: "bg-white/88 border-white/70",
  success: "bg-emerald-50/95 border-emerald-100",
  warning: "bg-amber-50/95 border-amber-100",
  dark: "bg-slate-950 text-white border-slate-900",
};

export default function StatCard({ label, value, sublabel, tone = "default" }: StatCardProps) {
  return (
    <div className={`card min-h-[126px] ${toneClasses[tone]}`}>
      <p className={`mb-2 text-sm font-medium ${tone === "dark" ? "text-slate-300" : "text-slate-500"}`}>{label}</p>
      <p className={`text-3xl font-semibold tracking-tight ${tone === "dark" ? "text-white" : "text-slate-950"}`}>{value}</p>
      {sublabel ? <p className={`mt-3 text-xs leading-5 ${tone === "dark" ? "text-slate-400" : "text-slate-400"}`}>{sublabel}</p> : null}
    </div>
  );
}
