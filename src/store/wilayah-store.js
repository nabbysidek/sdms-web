import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useWilayahStore = create((set) => ({
  wilayahs: [],

  // Fetch States
  fetchWilayahs: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/wilayah`);
      set({
        wilayahs: response.data,
      });
    } catch (error) {
      console.error("Error in fetching states:", error);
    }
  },

  // Create State
  createWilayah: async (wilayahInput, handleCloseCreateWilayah) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/wilayah`,
        wilayahInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in creating a state.");
        handleCloseCreateWilayah();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update State
  updateWilayah: async (
    wilayahId,
    wilayahInput,
    handleCloseEditWilayah,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/wilayah/${wilayahId}`,
        wilayahInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the state.");
        handleCloseEditWilayah();
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

  // Delete State
  deleteWilayah: async (wilayahId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/wilayah/${wilayahId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          wilayahs: state.wilayahs.filter(
            (wilayah) => wilayah.id !== wilayahId
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

export default useWilayahStore;
