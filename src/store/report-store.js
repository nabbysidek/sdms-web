import { create } from "zustand";
import showConfirmationDialog from "../pages/manage data/showConfirmationDialog";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useReportStore = create((set) => ({
  // Search Reports
  linkClicked: false,
  setLinkClicked: (value) => set({ linkClicked: value }),
  validationErrors: null,
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  searchResults: null,
  setSearchResults: (results) => set({ searchResults: results }),

  // Create Report
  handleCreateReport: async (data) => {
    try {
      const response = await axiosCustom.post(
        `report/student-misdemeanor`,
        data
      );

      if (response.status === 200) {
        console.log("Success");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Edit Report
  handleEditReport: async (reportInput, reportId) => {
    try {
      const response = await axiosCustom.put(
        `report/student-misdemeanor/${reportId}`,
        reportInput
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
      console.log(error);
    }
  },

  // Delete Report
  handleDeleteReport: async (reportId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosCustom.delete(
          `report/student-misdemeanor/${reportId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.success,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error,
        });
      }
    }
  },
}));

export default useReportStore;
