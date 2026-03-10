import { PlayCircle, CheckCircle, Clock, IndianRupee } from 'lucide-react';

const EnrollmentCard = ({ enrollment }) => {
  const isCompleted = enrollment.status === 'Completed';

  return (
    <div
      className="rounded-2xl border p-5 hover:-translate-y-0.5 transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <PlayCircle size={20} className="text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">

          {/* Title + badge */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3
              className="text-sm sm:text-base font-bold truncate"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)' }}
            >
              {enrollment.course?.courseName || 'Course'}
            </h3>
            <span
              className="shrink-0 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
              style={{
                backgroundColor: isCompleted ? 'var(--color-success-bg)' : 'var(--color-accent-light)',
                color:           isCompleted ? 'var(--color-success)'    : 'var(--color-accent)',
              }}
            >
              <CheckCircle size={10} />
              {isCompleted ? 'Completed' : 'Enrolled'}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-xs sm:text-sm line-clamp-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {enrollment.course?.courseDescription || ''}
          </p>

          {/* Meta — date + price */}
          <div
            className="flex flex-wrap gap-4 text-[11px] pt-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {new Date(enrollment.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-0.5">
              <IndianRupee size={11} />
              {enrollment.course?.price || '—'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;