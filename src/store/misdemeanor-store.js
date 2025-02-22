import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useMisdemeanorStore = create((set) => ({
  misdemeanors: [],
  misdemeanorCategoryOptions: [],

  // Fetch Misdemeanors
  fetchMisdemeanors: async () => {
    try {
      const response = await axiosCustom.get(`manage-data/misdemeanor`);
      set({
        misdemeanors: response.data,
      });
    } catch (error) {
      console.error("Error fetching misdemeanors:", error);
    }
  },

  // Fetch Misdemeanor Category options
  fetchMisdemeanorCategories: async () => {
    try {
      const response = await axiosCustom.get(
        `manage-data/misdemeanor-category/display-misdemeanor-category`
      );

      if (Array.isArray(response.data)) {
        set({
          misdemeanorCategoryOptions: response.data.map((misdemeanorCategory) => ({
            value: misdemeanorCategory.id,
            label: misdemeanorCategory.namaMisdemeanorCategory,
          })),
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Create Misdemeanor
  createMisdemeanor: async (
    misdemeanorInput,
    handleCloseCreateMisdemeanor
  ) => {
    try {
      const response = await axiosCustom.post(
        `manage-data/misdemeanor`,
        misdemeanorInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in creating a misdemeanor.");
        handleCloseCreateMisdemeanor();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update Misdemeanor
  updateMisdemeanor: async (
    misdemeanorId,
    misdemeanorInput,
    handleCloseEditMisdemeanor,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `manage-data/misdemeanor/${misdemeanorId}`,
        misdemeanorInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the misdemeanor.");
        handleCloseEditMisdemeanor();
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

  // Delete Misdemeanor
  deleteMisdemeanor: async (misdemeanorId) => {
    try {
      const response = await axiosCustom.delete(
        `manage-data/misdemeanor/${misdemeanorId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          misdemeanors: state.misdemeanors.filter(
            (misdemeanor) => misdemeanor.id !== misdemeanorId
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

export default useMisdemeanorStore;
