import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useCawanganStore = create((set) => ({
  cawangans: [],
  namaWilayahOptions: [],

  // FETCH CAWANGAN
  fetchCawangans: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/cawangan`);
      set({
        cawangans: response.data,
      });
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat cawangan:", error);
    }
  },

  // FETCH WILAYAH OPTIONS
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

  // CREATE CAWANGAN
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
        console.log("Cawangan berjaya ditambah");
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

  // UPDATE CAWANGAN
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
        console.log("Cawangan berjaya dikemaskini");
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

  // DELETE CAWANGAN
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
