import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useKakitanganStore = create((set) => ({
  kakitangans: [],

  // Fetch Staff
  fetchKakitangans: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/kakitangan`);
      set({
        kakitangans: response.data,
      });
    } catch (error) {
      console.error("Error in fetching staff:", error);
    }
  },

  // Create Staff record
  createKakitangan: async (kakitanganInput, handleCloseCreateKakitangan) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/kakitangan`,
        kakitanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Successful in creating a staff record.");
        handleCloseCreateKakitangan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update Staff record
  updateKakitangan: async (
    kakitanganId,
    kakitanganInput,
    handleCloseEditKakitangan,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/kakitangan/${kakitanganId}`,
        kakitanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the staff record.");
        handleCloseEditKakitangan();
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

  // Delete Staff record
  deleteKakitangan: async (kakitanganId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/kakitangan/${kakitanganId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          kakitangans: state.kakitangans.filter(
            (kakitangan) => kakitangan.id !== kakitanganId
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

export default useKakitanganStore;
