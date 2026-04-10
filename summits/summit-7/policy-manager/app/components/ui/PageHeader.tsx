interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  eyebrow?: string;
}

export default function PageHeader({ title, description, action, eyebrow }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{eyebrow}</p>
        ) : null}
        <h1>{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm text-slate-500">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
