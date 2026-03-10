import axiosInstance from "./axiosInstance";

// Fetch all courses
export const fetchAllCourses = async () => {
  const res = await axiosInstance.get("/course/get-courses");
  return res.data.data; 
};

// Create a new course
export const createCourse = async (courseData) => {
  const res = await axiosInstance.post("/course/create-course", courseData);
  return res.data;
};

// Update a course
export const updateCourse = async ({ id, ...courseData }) => {
  const res = await axiosInstance.put(`/course/update-course/${id}`, courseData);
  return res.data;
};

// Delete a course
export const deleteCourse = async (id) => {
  const res = await axiosInstance.delete(`/course/delete-course/${id}`);
  return res.data;
};