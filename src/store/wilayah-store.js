import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useWilayahStore = create((set) => ({
  wilayahs: [],

  // FETCH WILAYAH
  fetchWilayahs: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/wilayah`
      );
      set({
        wilayahs: response.data,
      });
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat wilayah:", error);
    }
  },

  // CREATE WILAYAH
  createWilayah: async (wilayahInput, handleCloseCreateWilayah) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/wilayah`,
        wilayahInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Wilayah berjaya ditambah");
        handleCloseCreateWilayah();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // UPDATE WILAYAH
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
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Wilayah berjaya dikemaskini");
        handleCloseEditWilayah();
        onUpdateSuccess();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // DELETE WILAYAH
  deleteWilayah: async (wilayahId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/wilayah/${wilayahId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
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
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },
}));

export default useWilayahStore;