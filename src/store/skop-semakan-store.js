import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useSkopSemakanStore = create((set) => ({
  skopSemakans: [],

  // fetch skop semakan
  fetchSkopSemakans: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/skop-semakan`
      );
      set({
        skopSemakans: response.data,
      });

    } catch (error) {
      console.error("Ralat dalam mengambil maklumat skopSemakan:", error);
    }
  },

  // create skop semakan
  createSkopSemakan: async (skopSemakanInput, handleCloseCreateSkopSemakan) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/skop-semakan`,
        skopSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("SkopSemakan berjaya ditambah");
        handleCloseCreateSkopSemakan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // update skop semakan
  updateSkopSemakan: async (
    skopSemakanId,
    skopSemakanInput,
    handleCloseEditSkopSemakan,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/skop-semakan/${skopSemakanId}`,
        skopSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("SkopSemakan berjaya dikemaskini");
        handleCloseEditSkopSemakan();
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

  // delete skop semakan
  deleteSkopSemakan: async (skopSemakanId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/skop-semakan/${skopSemakanId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });

        set((state) => ({
          skopSemakans: state.skopSemakans.filter(
            (skopSemakan) => skopSemakan.id !== skopSemakanId
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

export default useSkopSemakanStore;