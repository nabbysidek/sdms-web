import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useStudentStore = create((set) => ({
  students: [],

  // Fetch Students
  fetchStudents: async () => {
    try {
      const response = await axiosCustom.get(`manage-data/students`);
      set({ students: response.data });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  },

  // Create Student record
  createStudent: async (studentInput, handleCloseCreateStudent) => {
    try {
      const response = await axiosCustom.post(
        `manage-data/students`,
        studentInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success, // Success message from backend
        });
        console.log("Successfully created a student record.");
        handleCloseCreateStudent();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to create student.",
      });
    }
  },

  // Update Student record
  updateStudent: async (
    studentId,
    studentInput,
    handleCloseEditStudent,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `manage-data/students/${studentId}`,
        studentInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successfully updated the student record.");
        handleCloseEditStudent();
        onUpdateSuccess();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to update student.",
      });
    }
  },

  // Delete Student record
  deleteStudent: async (studentId) => {
    try {
      const response = await axiosCustom.delete(
        `manage-data/students/${studentId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        // Remove the deleted student from state
        set((state) => ({
          students: state.students.filter((student) => student.id !== studentId),
        }));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to delete student.",
      });
    }
  },
}));

export default useStudentStore;
