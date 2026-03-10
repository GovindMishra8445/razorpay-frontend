import {
  BookOpen, IndianRupee, Clock, Users,
  Pencil, Trash2, CheckCircle,
} from "lucide-react";

const CourseCard = ({ course, onEnroll, onEdit, onDelete, isEnrolled, isAdmin }) => (
  <div className="group relative rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200">

    {/* Thumbnail */}
    <div className="relative h-44 bg-[var(--color-bg-elevated)] flex items-center justify-center overflow-hidden">
      {course.thumbnail ? (
        <img src={course.thumbnail} alt={course.courseName} className="w-full h-full object-cover" />
      ) : (
        <>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 70% 30%, var(--color-accent-light) 0%, transparent 70%)" }} />
          <BookOpen size={44} className="relative z-10 opacity-40 group-hover:opacity-60 transition-opacity" style={{ color: "var(--color-accent)" }} />
        </>
      )}

      {/* Admin Side — visible on hover Edit and Delete */}
      {isAdmin && (
        <div className="absolute top-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={e => { e.stopPropagation(); onEdit(course); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors"
            style={{ backgroundColor: "var(--color-bg-surface)" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--color-accent-light)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--color-bg-surface)"}
          >
            <Pencil size={12} style={{ color: "var(--color-accent)" }} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(course); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors"
            style={{ backgroundColor: "var(--color-bg-surface)" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--color-error-bg)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--color-bg-surface)"}
          >
            <Trash2 size={12} style={{ color: "var(--color-error)" }} />
          </button>
        </div>
      )}

      {/* Enrolled badge */}
      {isEnrolled && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
          style={{ backgroundColor: "var(--color-success-bg)", color: "var(--color-success)" }}
        >
          <CheckCircle size={10} /> Enrolled
        </div>
      )}
    </div>

    {/* Body */}
    <div className="p-4 sm:p-5 flex flex-col gap-2.5">
      <h3
        className="text-base font-bold leading-snug line-clamp-2 group-hover:opacity-75 transition-opacity"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-text-primary)" }}
      >
        {course.courseName}
      </h3>

      <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        {course.courseDescription || "No description provided."}
      </p>

      <div className="flex items-center justify-between gap-3 pt-3 mt-0.5" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-0.5">
          <IndianRupee size={14} style={{ color: "var(--color-text-primary)" }} />
          <span className="text-xl font-bold leading-none" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text-primary)" }}>
            {course.price}
          </span>
        </div>
        <button
          disabled={isEnrolled}
          onClick={() => !isEnrolled && onEnroll(course._id)}
          className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white border-none cursor-pointer transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-75"
          style={{ backgroundColor: isEnrolled ? "var(--color-success)" : "var(--color-accent)" }}
        >
          {isEnrolled ? "Enrolled" : "Enroll Now"}
        </button>
      </div>
    </div>
  </div>
);

export default CourseCard;