import { useState, useEffect } from "react";
import {
  X,
  BookOpen,
  IndianRupee,
  FileText,
  Image,
  Plus,
  Save,
} from "lucide-react";

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--color-text-muted)]">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
  </div>
);

const inputCls = (hasError = false) =>
  `w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all
   bg-[var(--color-elevated)] border
   text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
   focus:ring-2 focus:ring-[var(--color-accent-ring)] focus:border-[var(--color-accent)]
   ${hasError ? "border-[var(--color-error)]" : "border-[var(--color-border)]"}`;

const CourseForm = ({
  isOpen,
  onClose,
  onSubmit,
  editCourse = null,
  isLoading = false,
}) => {
  const isEditing = !!editCourse;
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    price: "",
    thumbnail: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editCourse) {
      setForm({
        courseName: editCourse.courseName || "",
        courseDescription: editCourse.courseDescription || "",
        price: editCourse.price?.toString() || "",
        thumbnail: editCourse.thumbnail || "",
      });
    } else {
      setForm({
        courseName: "",
        courseDescription: "",
        price: "",
        thumbnail: "",
      });
    }
    setErrors({});
  }, [editCourse, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.courseName.trim()) e.courseName = "Course name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length) {
      setErrors(ve);
      return;
    }
    const payload = {
      courseName: form.courseName.trim(),
      courseDescription: form.courseDescription.trim(),
      price: Number(form.price),
      thumbnail: form.thumbnail.trim(),
    };
    if (isEditing) payload.id = editCourse._id;
    onSubmit(payload);
  };

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/55 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:max-w-lg bg-[var(--color-surface)] rounded-t-3xl sm:rounded-2xl shadow-[var(--shadow-lg)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
              {isEditing ? (
                <Save size={15} className="text-[var(--color-accent)]" />
              ) : (
                <Plus size={15} className="text-[var(--color-accent)]" />
              )}
            </div>
            <h2
              className="text-base font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-text-primary)",
              }}
            >
              {isEditing ? "Edit Course" : "Create New Course"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-elevated)] transition-colors border-none bg-transparent cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 flex flex-col gap-4"
        >
          {/* Course Name */}
          <Field label="Course Name *" error={errors.courseName}>
            <div className="relative">
              <BookOpen
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              />
              <input
                type="text"
                value={form.courseName}
                onChange={set("courseName")}
                placeholder="e.g. React Mastery 2026"
                className={inputCls(!!errors.courseName)}
              />
            </div>
          </Field>

          {/* Description */}
          <Field label="Description">
            <div className="relative">
              <FileText
                size={14}
                className="absolute left-3.5 top-3 text-[var(--color-text-muted)] pointer-events-none"
              />
              <textarea
                value={form.courseDescription}
                onChange={set("courseDescription")}
                placeholder="What will students learn?"
                rows={3}
                className={`${inputCls()} resize-none`}
              />
            </div>
          </Field>

          {/* Price */}
          <Field label="Price (₹) *" error={errors.price}>
            <div className="relative">
              <IndianRupee
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              />
              <input
                type="number"
                value={form.price}
                onChange={set("price")}
                placeholder="e.g. 499"
                min="1"
                className={inputCls(!!errors.price)}
              />
            </div>
          </Field>

          {/* Thumbnail */}
          <Field label="Thumbnail URL (optional)">
            <div className="relative">
              <Image
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              />
              <input
                type="url"
                value={form.thumbnail}
                onChange={set("thumbnail")}
                placeholder="https://example.com/image.jpg"
                className={inputCls()}
              />
            </div>
          </Field>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[var(--color-text-secondary)] bg-[var(--color-elevated)] hover:bg-[var(--color-subtle)] transition-colors border-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-[var(--shadow-sm)] border-none cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {isEditing ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  {isEditing ? <Save size={14} /> : <Plus size={14} />}
                  {isEditing ? "Save Changes" : "Create Course"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
