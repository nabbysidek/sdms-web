import { create } from "zustand";
import showConfirmationDialog from "../pages/tetapan kriteria/showConfirmationDialog";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useRepotIndividuStore = create((set) => ({

  // search
  linkClicked: false,
  setLinkClicked: (value) => set({ linkClicked: value }),
  validationErrors: null,
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  searchResults: null,
  setSearchResults: (results) => set({ searchResults: results }),


  // handle delete
  handleDeleteRepotIndividu: async (auditId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosCustom.delete(
          `repot-individu/ketidakpatuhan-kakitangan/${auditId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.error,
        });
      }
    }
  },
}));

export default useRepotIndividuStore;
