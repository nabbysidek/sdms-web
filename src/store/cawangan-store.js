import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useCawanganStore = create((set) => ({
  cawangans: [],
  totalPage: 1,
  totalItems: 0,
  namaWilayahOptions: [],

  // fetch cawangan
  fetchCawangans: async (page = 1) => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/cawangan?page=${page}`
      );
      set({
        cawangans: response.data.data,
        totalPage: response.data.last_page,
        totalItems: response.data.total,
      });
      return response.data.data; // provide updated fetching for delete and handleAddsuccess
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat cawangan:", error);
    }
  },

  // fetch wilayah options
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

  // create cawangan
  createCawangan: async (cawanganInput, handleCloseCreateCawangan) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/cawangan`,
        cawanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Cawangan berjaya ditambah");
        handleCloseCreateCawangan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // update cawangan
  updateCawangan: async (cawanganId, cawanganInput, handleCloseEditCawangan, onUpdateSuccess) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/cawangan/${cawanganId}`,
        cawanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Cawangan berjaya dikemaskini");
        handleCloseEditCawangan();
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

  // delete cawangan
  deleteCawangan: async (cawanganId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/cawangan/${cawanganId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
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
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },
}));

export default useCawanganStore;
