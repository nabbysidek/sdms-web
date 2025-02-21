import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useClassStore = create((set) => ({
  classes: [],
  namaYearOptions: [],

  // Fetch Classes
  fetchClasses: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/class`);
      set({
        classes: response.data,
      });
    } catch (error) {
      console.error("Error in fetching classes:", error);
    }
  },

  // Fetch Year Options
  fetchYears: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/year/display-year`
      );

      if (Array.isArray(response.data)) {
        set({
          namaYearOptions: response.data.map((year) => ({
            value: year.id,
            label: year.namaYear,
          })),
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Create Class
  createClass: async (classInput, handleCloseCreateClass) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/class`,
        classInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in creating a class.");
        handleCloseCreateClass();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update Class
  updateClass: async (
    classId,
    classInput,
    handleCloseEditClass,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/class/${classId}`,
        classInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the class.");
        handleCloseEditClass();
        onUpdateSuccess();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Delete Class
  deleteClass: async (classId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/class/${classId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          classes: state.classes.filter(
            (cls) => cls.id !== classId
          ),
        }));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },
}));

export default useClassStore;
