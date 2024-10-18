import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useJabatanStore = create((set) => ({
  jabatans: [],
  namaBahagianOptions: [],

  // FETCH JABATAN
  fetchJabatans: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/jabatan`);
      set({
        jabatans: response.data,
      });
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat jabatan:", error);
    }
  },

  //  FETCH BAHAGIAN OPTIONS
  fetchBahagians: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/bahagian/display-bahagian`
      );

      if (Array.isArray(response.data)) {
        set({
          namaBahagianOptions: response.data.map((bahagian) => ({
            value: bahagian.id,
            label: bahagian.namaBahagian,
          })),
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // CREATE JABATAN
  createJabatan: async (jabatanInput, handleCloseCreateJabatan) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/jabatan`,
        jabatanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Jabatan berjaya ditambah");
        handleCloseCreateJabatan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  //   UPDATE JABATAN
  updateJabatan: async (
    jabatanId,
    jabatanInput,
    handleCloseEditJabatan,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/jabatan/${jabatanId}`,
        jabatanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Jabatan berjaya dikemaskini");
        handleCloseEditJabatan();
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

  // DELETE JABATAN
  deleteJabatan: async (jabatanId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/jabatan/${jabatanId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          jabatans: state.jabatans.filter(
            (jabatan) => jabatan.id !== jabatanId
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

export default useJabatanStore;
