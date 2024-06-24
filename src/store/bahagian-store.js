import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useBahagianStore = create((set) => ({
  bahagians: [],
  totalPage: 1,
  totalItems: 0,

  // fetch bahagian
  fetchBahagians: async (page = 1) => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/bahagian?page=${page}`
      );
      set({
        bahagians: response.data.data,
        totalPage: response.data.last_page,
        totalItems: response.data.total,
      });
      return response.data.data; // provide updated fetching for delete and handleAddsuccess
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat bahagian:", error);
    }
  },

  // create bahagian
  createBahagian: async (bahagianInput, handleCloseCreateBahagian) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/bahagian`,
        bahagianInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Bahagian berjaya ditambah");
        handleCloseCreateBahagian();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // update bahagian
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
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Bahagian berjaya dikemaskini");
        handleCloseEditBahagian();
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

  // delete bahagian
  deleteBahagian: async (bahagianId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/bahagian/${bahagianId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
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
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },
  
}));

export default useBahagianStore;