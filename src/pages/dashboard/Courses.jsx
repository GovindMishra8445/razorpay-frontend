import { useState } from "react";
import { BookOpen, Search, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from "../../hooks/useCourses";
import { useAuthStore } from "../../store/useAuthStore";
import CourseCard from "../../components/CourseCard";
import EnrollmentForm from "../../components/EnrollmentForm";
import CourseForm from "../../components/CourseForm";
import ConfirmModal from "../../components/ConfirmModal";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import { CourseCardSkeleton } from "../../components/Shimmer";
import axiosInstance from "../../api/axiosInstance";

const Courses = () => {
  const { data: courses, isLoading } = useCourses();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const [enrollModal,  setEnrollModal]  = useState({ open: false, course: null });
  const [courseForm,   setCourseForm]   = useState({ open: false, editCourse: null });
  const [deleteModal,  setDeleteModal]  = useState({ open: false, course: null });
  const [payLoading,   setPayLoading]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");

  const { mutate: createCourse, isPending: isCreating } = useCreateCourse(
    () => setCourseForm({ open: false, editCourse: null })
  );
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse(
    () => setCourseForm({ open: false, editCourse: null })
  );
  const { mutate: deleteCourse } = useDeleteCourse();

  const { data: enrollments } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: async () => (await axiosInstance.get("/payment/my-enrollments")).data.data,
  });
  const enrolledIds = enrollments?.map(e => e.course?._id) || [];

  const filtered = courses?.filter(c =>
    c.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.courseDescription?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Payment handler ───────────────────────────
  const handlePayment = async () => {
    if (!enrollModal.course) return;
    setPayLoading(true);
    try {
      const { data: order } = await axiosInstance.post("/payment/capturePayment", {
        courseId: enrollModal.course._id,
      });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "EduStream",
        description: enrollModal.course.courseName,
        order_id: order.orderId,
        handler: async (response) => {
          try {
            const v = await axiosInstance.post("/payment/verifySignature", {
              ...response,
              courseId: enrollModal.course._id,
            });
            if (v.data.success) {
              toast.success("Enrolled successfully! Happy learning!");
              setEnrollModal({ open: false, course: null });
            }
          } catch {
            toast.error("Payment verification failed.");
          }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: "#c47d2b" },
        modal: { ondismiss: () => setPayLoading(false) },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment initiation failed.");
    } finally {
      setPayLoading(false);
    }
  };

  // ── Delete confirm ────────────────────────────────────────
  const handleDeleteConfirm = () => {
    if (!deleteModal.course) return;
    deleteCourse(deleteModal.course._id);
    setDeleteModal({ open: false, course: null });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Courses"
        subtitle={`${filtered?.length || 0} courses available`}
        action={
          isAdmin && (
            <button
              onClick={() => setCourseForm({ open: true, editCourse: null })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold border-none cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <Plus size={15} /> Add Course
            </button>
          )
        }
      />

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--color-text-muted)" }}
        />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{
            backgroundColor: "var(--color-bg-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
          }}
          onFocus={e => e.target.style.borderColor = "var(--color-accent)"}
          onBlur={e => e.target.style.borderColor = "var(--color-border)"}
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {[1,2,3,4,5,6].map(i => <CourseCardSkeleton key={i} />)}
        </div>
      ) : !filtered?.length ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description={
            searchQuery
              ? "No courses match your search. Try different keywords."
              : isAdmin
                ? "Add your first course using the button above."
                : "No courses available yet. Check back soon!"
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              isAdmin={isAdmin}
              isEnrolled={enrolledIds.includes(course._id)}
              onEnroll={id => {
                const c = courses.find(x => x._id === id);
                if (c) setEnrollModal({ open: true, course: c });
              }}
              onEdit={c => setCourseForm({ open: true, editCourse: c })}
              onDelete={c => setDeleteModal({ open: true, course: c })}
            />
          ))}
        </div>
      )}

      {/* Enrollment payment modal */}
      <EnrollmentForm
        isOpen={enrollModal.open}
        onClose={() => setEnrollModal({ open: false, course: null })}
        course={enrollModal.course}
        onConfirm={handlePayment}
        isLoading={payLoading}
      />

      {/* Course create / edit modal */}
      <CourseForm
        isOpen={courseForm.open}
        onClose={() => setCourseForm({ open: false, editCourse: null })}
        editCourse={courseForm.editCourse}
        onSubmit={p => courseForm.editCourse ? updateCourse(p) : createCourse(p)}
        isLoading={isCreating || isUpdating}
      />

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ open: false, course: null })}
        title="Delete course?"
        description={`"${deleteModal.course?.courseName}" will be permanently removed.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default Courses;