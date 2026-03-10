import { ClipboardList } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import { EnrollmentCardSkeleton } from "../../components/Shimmer";
import EnrollmentCard from "../../components/Enrollments";

const Enrollments = () => {
  const { data: enrollments, isLoading } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: async () =>
      (await axiosInstance.get("/payment/my-enrollments")).data.data,
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="My Enrollments"
        subtitle={
          isLoading
            ? "Loading..."
            : `${enrollments?.length || 0} courses enrolled`
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <EnrollmentCardSkeleton key={i} />
          ))}
        </div>
      ) : !enrollments?.length ? (
        <EmptyState
          icon={ClipboardList}
          title="No enrollments yet"
          description="You haven't enrolled in any courses. Browse our catalog and start learning today!"
          actionLabel="Browse Courses"
          actionTo="/dashboard/courses"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {enrollments.map((e) => (
            <EnrollmentCard key={e._id} enrollment={e} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Enrollments;
