import { AlertTriangle, Info, CheckCircle } from "lucide-react";

const iconMap = {
  danger:  { icon: AlertTriangle, bg: "var(--color-error-bg)",   color: "var(--color-error)"   },
  info:    { icon: Info,          bg: "var(--color-accent-light)", color: "var(--color-accent)" },
  success: { icon: CheckCircle,   bg: "var(--color-success-bg)", color: "var(--color-success)" },
};

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  description = "",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}) => {
  if (!isOpen) return null;

  const { icon: Icon, bg, color } = iconMap[variant] || iconMap.danger;

  const confirmBg =
    variant === "danger"
      ? "var(--color-error)"
      : variant === "success"
      ? "var(--color-success)"
      : "var(--color-accent)";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl border p-6 flex flex-col gap-5 shadow-2xl"
        style={{
          backgroundColor: "var(--color-bg-surface)",
          borderColor: "var(--color-border)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Icon + text */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: bg }}
          >
            <Icon size={26} style={{ color }} />
          </div>
          <div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-text-primary)" }}
            >
              {title}
            </h3>
            {description && (
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ backgroundColor: "var(--color-border)" }} />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors border"
            style={{
              backgroundColor: "var(--color-bg-elevated)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--color-bg-elevated)"}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: confirmBg }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;