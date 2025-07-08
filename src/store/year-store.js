import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useYearStore = create((set) => ({
  years: [],

  // Fetch Years
  fetchYears: async () => {
    try {
      const response = await axiosCustom.get(`data/year`);
      set({
        years: response.data,
      });
    } catch (error) {
      console.error("Error in fetching years:", error);
    }
  },

  // Create Year
  createYear: async (yearInput, handleCloseCreateYear) => {
    try {
      const response = await axiosCustom.post(
        `manage-data/year`,
        yearInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in creating a year.");
        handleCloseCreateYear();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update Year
  updateYear: async (
    yearId,
    yearInput,
    handleCloseEditYear,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `manage-data/year/${yearId}`,
        yearInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the year.");
        handleCloseEditYear();
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

  // Delete Year
  deleteYear: async (yearId) => {
    try {
      const response = await axiosCustom.delete(
        `manage-data/year/${yearId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          years: state.years.filter(
            (year) => year.id !== yearId
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

export default useYearStore;
