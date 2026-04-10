interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  tone?: "default" | "success" | "warning" | "dark";
}

const toneClasses = {
  default: "bg-white",
  success: "bg-emerald-50",
  warning: "bg-amber-50",
  dark: "bg-slate-950 text-white border-slate-900",
};

export default function StatCard({ label, value, sublabel, tone = "default" }: StatCardProps) {
  return (
    <div className={`card ${toneClasses[tone]}`}>
      <p className={`mb-1 text-sm ${tone === "dark" ? "text-slate-300" : "text-slate-500"}`}>{label}</p>
      <p className={`text-3xl font-semibold ${tone === "dark" ? "text-white" : "text-slate-950"}`}>{value}</p>
      {sublabel ? (
        <p className={`mt-2 text-xs ${tone === "dark" ? "text-slate-400" : "text-slate-400"}`}>{sublabel}</p>
      ) : null}
    </div>
  );
}
