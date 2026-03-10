import { X, ShieldCheck, CreditCard, BookOpen, Zap } from 'lucide-react';

const EnrollmentForm = ({ isOpen, onClose, course, onConfirm, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/55 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: 'var(--color-bg-surface)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 sm:px-6 py-4"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-accent-light)' }}
            >
              <CreditCard size={15} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h2
              className="text-base font-bold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)' }}
            >
              Enrollment Summary
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl border-none bg-transparent cursor-pointer transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-bg-elevated)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4">

          {/* Course info */}
          <div
            className="flex items-start gap-3 p-4 rounded-2xl border"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--color-accent-light)' }}
            >
              <BookOpen size={18} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div className="min-w-0">
              <p
                className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Course
              </p>
              <p
                className="text-sm font-bold truncate"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {course?.courseName || '—'}
              </p>
              <p
                className="text-xs truncate mt-0.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {course?.courseDescription || ''}
              </p>
            </div>
          </div>

          {/* Price breakdown */}
          <div
            className="p-4 rounded-2xl border flex flex-col gap-2.5"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--color-text-muted)' }}>Course Fee</span>
              <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                ₹{course?.price}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--color-text-muted)' }}>Platform Fee</span>
              <span className="font-semibold" style={{ color: 'var(--color-success)' }}>Free</span>
            </div>
            <div
              className="pt-2.5 flex justify-between items-center"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Total
              </span>
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)' }}
              >
                ₹{course?.price}
              </span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-2">
            {[
              { icon: ShieldCheck, text: 'Secure Payment via Razorpay', color: 'var(--color-success)' },
              { icon: Zap,         text: 'Instant Lifetime Access',     color: 'var(--color-accent)'  },
            ].map(({ icon: Icon, text, color }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Icon size={15} style={{ color, flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm sm:text-base border-none cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={17} />
                Pay ₹{course?.price} & Enroll
              </>
            )}
          </button>

          <p className="text-center text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
            By proceeding, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;