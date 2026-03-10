import { Link } from 'react-router-dom';

const EmptyState = ({ icon: Icon, title, description, actionLabel, actionTo }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div className="w-14 h-14 rounded-2xl bg-[var(--color-elevated)] border border-[var(--color-border)] flex items-center justify-center mb-5">
      <Icon size={24} className="text-[var(--color-text-muted)]" />
    </div>
    <h3 className="font-serif text-lg font-bold text-[var(--color-text-primary)] mb-2">{title}</h3>
    <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed mb-6">{description}</p>
    {actionLabel && actionTo && (
      <Link
        to={actionTo}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-sm font-semibold transition-colors no-underline"
      >
        {actionLabel}
      </Link>
    )}
  </div>
);

export default EmptyState;