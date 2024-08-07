import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useAktivitiSemakanStore = create((set) => ({
  aktivitiSemakans: [],
  namaSkopKriteriaOptions: [],

  // fetch aktiviti semakan
  fetchAktivitiSemakans: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/aktiviti-semakan`
      );
      set({
        aktivitiSemakans: response.data,
      });
      return response.data.data;
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat aktiviti semakan:", error);
    }
  },

  // fetch skopKriteria options
  fetchSkopKriterias: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/skop-kriteria/display-skop-kriteria`
      );

      if (Array.isArray(response.data)) {
        set({
          namaSkopKriteriaOptions: response.data.map((skopKriteria) => ({
            value: skopKriteria.id,
            label: skopKriteria.namaSkopKriteria,
          })),
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // create aktiviti semakan
  createAktivitiSemakan: async (aktivitiSemakanInput, handleCloseCreateAktivitiSemakan) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/aktiviti-semakan`,
        aktivitiSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Aktiviti semakan berjaya ditambah");
        handleCloseCreateAktivitiSemakan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // update aktiviti semakan
  updateAktivitiSemakan: async (aktivitiSemakanId, aktivitiSemakanInput, handleCloseEditAktivitiSemakan, onUpdateSuccess) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/aktiviti-semakan/${aktivitiSemakanId}`,
        aktivitiSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Aktiviti semakan berjaya dikemaskini");
        handleCloseEditAktivitiSemakan();
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

  // delete aktiviti semakan
  deleteAktivitiSemakan: async (aktivitiSemakanId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/aktiviti-semakan/${aktivitiSemakanId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });

        set((state) => ({
          aktivitiSemakans: state.aktivitiSemakans.filter((aktivitiSemakan) => aktivitiSemakan.id !== aktivitiSemakanId),
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

export default useAktivitiSemakanStore;
