import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useMisdemeanorCategoryStore = create((set) => ({
  misdemeanorCategories: [],

  // Fetch Misdemeanor Category
  fetchMisdemeanorCategories: async () => {
    try {
      const response = await axiosCustom.get(`manage-data/misdemeanor-category`);
      set({
        misdemeanorCategories: response.data,
      });
    } catch (error) {
      console.error("Error fetching misdemeanor categories:", error);
    }
  },

  // Create Misdemeanor Category
  createMisdemeanorCategory: async (misdemeanorCategoryInput, handleCloseCreateMisdemeanorCategory) => {
    try {
      const response = await axiosCustom.post(
        `manage-data/misdemeanor-category`,
        misdemeanorCategoryInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Misdemeanor Category successfully added");
        handleCloseCreateMisdemeanorCategory();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update Misdemeanor Category
  updateMisdemeanorCategory: async (
    misdemeanorCategoryId,
    misdemeanorCategoryInput,
    handleCloseEditMisdemeanorCategory,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `manage-data/misdemeanor-category/${misdemeanorCategoryId}`,
        misdemeanorCategoryInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the misdemeanor category.");
        handleCloseEditMisdemeanorCategory();
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

  // Delete Misdemeanor Category
  deleteMisdemeanorCategory: async (misdemeanorCategoryId) => {
    try {
      const response = await axiosCustom.delete(
        `manage-data/misdemeanor-category/${misdemeanorCategoryId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          misdemeanorCategories: state.misdemeanorCategories.filter(
            (misdemeanorCategory) => misdemeanorCategory.id !== misdemeanorCategoryId
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

export default useMisdemeanorCategoryStore;
