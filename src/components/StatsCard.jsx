const colorMap = {
  amber: {
    bg:   'bg-[var(--color-accent-light)]',
    icon: 'text-[var(--color-accent)]',
  },
  green: {
    bg:   'bg-[var(--color-success-bg)]',
    icon: 'text-[var(--color-success)]',
  },
  red: {
    bg:   'bg-[var(--color-error-bg)]',
    icon: 'text-[var(--color-error)]',
  },
  muted: {
    bg:   'bg-[var(--color-elevated)]',
    icon: 'text-[var(--color-text-muted)]',
  },
};

const StatsCard = ({ icon: Icon, label, value, trend, color = 'amber' }) => {
  const { bg, icon } = colorMap[color] || colorMap.muted;

  return (
    <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--color-text-muted)] mb-2">
            {label}
          </p>
          <p className="font-serif text-3xl font-bold text-[var(--color-text-primary)] leading-none">
            {value}
          </p>
          {trend && (
            <p className="text-xs font-semibold text-[var(--color-success)] mt-1.5">{trend}</p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
          <Icon size={20} className={icon} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;