const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
    <div>
      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-1">
        EduStream
      </p>
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-[var(--color-text-muted)] mt-1">{subtitle}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default PageHeader;