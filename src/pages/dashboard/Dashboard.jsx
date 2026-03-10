import {
  BookOpen,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  PlayCircle,
  Clock,
  Clock6,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/useAuthStore";
import StatsCard from "../../components/StatsCard";
import {
  StatsCardSkeleton,
  WelcomeSkeleton,
  EnrollmentCardSkeleton,
} from "../../components/Shimmer";
import axiosInstance from "../../api/axiosInstance";

const Dashboard = () => {
  const { user } = useAuthStore();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const { data: enrollments, isLoading: el } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: async () =>
      (await axiosInstance.get("/payment/my-enrollments")).data.data,
  });

  const { data: courses, isLoading: cl } = useQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      (await axiosInstance.get("/course/get-courses")).data.data,
  });

  const isLoading = el || cl;
  const totalEnrolled = enrollments?.length || 0;
  const totalCompleted =
    enrollments?.filter((e) => e.status === "Completed").length || 0;
  const recent = enrollments?.slice(0, 3) || [];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Welcome banner */}
      {isLoading ? (
        <WelcomeSkeleton />
      ) : (
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
          {/* Decorative blobs */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[var(--color-accent-light)] opacity-70 pointer-events-none" />
          <div className="absolute -bottom-4 right-20 w-16 h-16 rounded-full bg-[var(--color-accent-light)] opacity-50 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">
                {greeting}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight">
                Welcome back, {user?.name?.split(" ")[0] || "Student"}!
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1.5">
                {totalEnrolled > 0
                  ? `You have ${totalEnrolled} course${totalEnrolled > 1 ? "s" : ""} enrolled. Keep going!`
                  : "Start your learning journey by enrolling in a course."}
              </p>
            </div>
            <Link
              to="/dashboard/courses"
              className="shrink-0 self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-sm font-semibold no-underline transition-colors shadow-[var(--shadow-sm)]"
            >
              Courses <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
           <StatsCard
              icon={TrendingUp}
              label="Total Courses"
              value={String(courses?.length || 0)}
              trend="Explore now"
              color="muted"
            />
            <StatsCard
              icon={BookOpen}
              label="Enrolled"
              value={String(totalEnrolled)}
              trend={totalEnrolled > 0 ? "Active" : "Start today"}
              color="amber"
            />
            <StatsCard
              icon={ClipboardList}
              label="Completed"
              value={String(totalCompleted)}
              trend={totalCompleted > 0 ? "Great job!" : "Keep going"}
              color="green"
            />
           
            <StatsCard  
              icon={Clock6}
              label="Comming Soon"
              color="amber"
            />
          </>
        )}
      </div>

      {/* Continue Learning */}
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-lg font-bold text-[var(--color-text-primary)]">
            {totalEnrolled > 0 ? "Continue Learning" : "Get Started"}
          </h3>
          <Link
            to="/dashboard/enrollments"
            className="flex items-center gap-1 text-[13px] font-semibold text-[var(--color-accent)] hover:underline no-underline transition-colors"
          >
            View all Courses <ArrowRight size={13} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <EnrollmentCardSkeleton key={i} />
            ))}
          </div>
        ) : recent.length > 0 ? (
          <div className="flex flex-col gap-3">
            {recent.map((enrollment) => (
              <div
                key={enrollment._id}
                className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)] transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)] flex items-center justify-center shrink-0">
                  <PlayCircle size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate mb-0.5">
                    {enrollment.course?.courseName || "Course"}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Clock
                      size={11}
                      className="text-[var(--color-text-muted)]"
                    />
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                      Enrolled{" "}
                      {new Date(enrollment.createdAt).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
                  Active
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-[var(--color-text-muted)]">
            No enrollments yet.
            <Link
              to="/dashboard/courses"
              className="text-[var(--color-accent)] font-semibold hover:underline"
            >
              All courses →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
