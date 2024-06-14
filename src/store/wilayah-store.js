import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useWilayahStore = create((set) => ({
  wilayahs: [],
  totalPage: 1,

  // Fetch wilayah
  fetchWilayahs: async (page = 1) => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/wilayah?page=${page}`
      );
      set({
        wilayahs: response.data.data,
        totalPage: response.data.last_page,
      });
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat wilayah:", error);
    }
  },

  // create wilayah
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

  // update wilayah
  updateWilayah: async (wilayahId, wilayahInput, handleCloseEditWilayah) => {
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
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // delete wilayah
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