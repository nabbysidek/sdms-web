import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useCawanganStore = create((set) => ({
  cawangans: [],
  namaWilayahOptions: [],

  // Fetch Branches
  fetchCawangans: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/cawangan`);
      set({
        cawangans: response.data,
      });
    } catch (error) {
      console.error("Error in fetching branches:", error);
    }
  },

  // Fetch State Options
  fetchWilayahs: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/wilayah/display-wilayah`
      );

      if (Array.isArray(response.data)) {
        set({
          namaWilayahOptions: response.data.map((wilayah) => ({
            value: wilayah.id,
            label: wilayah.namaWilayah,
          })),
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Create Branch
  createCawangan: async (cawanganInput, handleCloseCreateCawangan) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/cawangan`,
        cawanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in creating a branch.");
        handleCloseCreateCawangan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update Branch
  updateCawangan: async (
    cawanganId,
    cawanganInput,
    handleCloseEditCawangan,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/cawangan/${cawanganId}`,
        cawanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the branch.");
        handleCloseEditCawangan();
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

  // Delete Branch
  deleteCawangan: async (cawanganId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/cawangan/${cawanganId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          cawangans: state.cawangans.filter(
            (cawangan) => cawangan.id !== cawanganId
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

export default useCawanganStore;
