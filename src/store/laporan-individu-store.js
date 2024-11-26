import { create } from "zustand";
import showConfirmationDialog from "../pages/tetapan kriteria/showConfirmationDialog";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useLaporanIndividuStore = create((set) => ({
  // Search Audits
  linkClicked: false,
  setLinkClicked: (value) => set({ linkClicked: value }),
  validationErrors: null,
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  searchResults: null,
  setSearchResults: (results) => set({ searchResults: results }),

  // Create Audit
  handleCreateLaporanIndividu: async (data) => {
    try {
      const response = await axiosCustom.post(
        `laporan-individu/ketidakpatuhan-kakitangan`,
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

  // Edit Audit
  handleEditLaporanIndividu: async (laporanIndividuInput, auditsId) => {
    try {
      const response = await axiosCustom.put(
        `laporan-individu/ketidakpatuhan-kakitangan/${auditsId}`,
        laporanIndividuInput
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

  // Delete Audit
  handleDeleteLaporanIndividu: async (auditId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosCustom.delete(
          `laporan-individu/ketidakpatuhan-kakitangan/${auditId}`
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

export default useLaporanIndividuStore;
