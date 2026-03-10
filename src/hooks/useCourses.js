import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllCourses, createCourse, updateCourse, deleteCourse } from "../api/courseApi";
import { toast } from "react-toastify";

// ─── Fetch all courses ─────────────
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchAllCourses,
    staleTime: 1000 * 60 * 5, 
  });
};

// ─── Create course ────────────── 
export const useCreateCourse = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success(data.message || "Course created successfully!");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create course.");
    },
  });
};

// ─── Update course ───────────
export const useUpdateCourse = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success(data.message || "Course updated successfully!");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update course.");
    },
  });
};

// ─── Delete course ───────────────
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete course.");
    },
  });
};