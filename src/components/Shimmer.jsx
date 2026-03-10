
/* Base shimmer block */
const S = ({ className = '' }) => (
  <div
    className={`rounded-lg bg-[var(--color-elevated)] ${className}`}
    style={{
      background: `linear-gradient(90deg, var(--color-elevated) 25%, var(--color-subtle) 50%, var(--color-elevated) 75%)`,
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s ease-in-out infinite',
    }}
  />
);

/* ── Course Card ── */
export const CourseCardSkeleton = () => (
  <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
    <S className="h-44 rounded-none" />
    <div className="p-5 flex flex-col gap-3">
      <S className="h-4 w-4/5" />
      <S className="h-3 w-full" />
      <S className="h-3 w-3/5" />
      <div className="flex gap-3 mt-1">
        <S className="h-2.5 w-16" />
        <S className="h-2.5 w-16" />
      </div>
      <div className="flex justify-between items-center mt-2 pt-3 border-t border-[var(--color-border)]">
        <S className="h-6 w-16" />
        <S className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  </div>
);

/* ── Stats Card ── */
export const StatsCardSkeleton = () => (
  <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-2.5 flex-1">
        <S className="h-2.5 w-3/5" />
        <S className="h-8 w-2/5" />
        <S className="h-2.5 w-2/3" />
      </div>
      <S className="w-11 h-11 rounded-xl" />
    </div>
  </div>
);

/* ── Enrollment Card ── */
export const EnrollmentCardSkeleton = () => (
  <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
    <div className="flex gap-4 items-start">
      <S className="w-11 h-11 shrink-0 rounded-xl" />
      <div className="flex-1 flex flex-col gap-2.5">
        <S className="h-3.5 w-3/4" />
        <S className="h-3 w-full" />
        <S className="h-2 w-full rounded-full mt-1" />
      </div>
    </div>
  </div>
);

/* ── Welcome Banner ── */
export const WelcomeSkeleton = () => (
  <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 flex flex-col gap-3">
    <S className="h-3 w-32" />
    <S className="h-7 w-3/5" />
    <S className="h-4 w-4/5" />
  </div>
);

/* ── Profile ── */
export const ProfileSkeleton = () => (
  <div className="max-w-3xl mx-auto flex flex-col gap-5">
    <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
      <S className="h-28 rounded-none" />
      <div className="px-7 pb-7 flex flex-col gap-3">
        <S className="w-20 h-20 rounded-2xl -mt-10" />
        <S className="h-6 w-2/5" />
        <S className="h-3.5 w-2/5" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <StatsCardSkeleton />
      <StatsCardSkeleton />
      <StatsCardSkeleton />
    </div>
  </div>
);