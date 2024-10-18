import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useBahagianStore = create((set) => ({
  bahagians: [],

  // FETCH BAHAGIAN
  fetchBahagians: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/bahagian`);
      set({
        bahagians: response.data,
      });
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat bahagian:", error);
    }
  },

  // CREATE BAHAGIAN
  createBahagian: async (bahagianInput, handleCloseCreateBahagian) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/bahagian`,
        bahagianInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Bahagian berjaya ditambah");
        handleCloseCreateBahagian();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // UPDATE BAHAGIAN
  updateBahagian: async (
    bahagianId,
    bahagianInput,
    handleCloseEditBahagian,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/bahagian/${bahagianId}`,
        bahagianInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Bahagian berjaya dikemaskini");
        handleCloseEditBahagian();
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

  // DELETE BAHAGIAN
  deleteBahagian: async (bahagianId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/bahagian/${bahagianId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          bahagians: state.bahagians.filter(
            (bahagian) => bahagian.id !== bahagianId
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

export default useBahagianStore;
