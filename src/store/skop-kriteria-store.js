import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useSkopKriteriaStore = create((set) => ({
  skopKriterias: [],
  totalPage: 1,
  totalItems: 0,
  namaSkopSemakanOptions: [],

  // fetch skop kriteria
  fetchSkopKriterias: async (page = 1) => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/skop-kriteria?page=${page}`
      );
      set({
        skopKriterias: response.data.data,
        totalPage: response.data.last_page,
        totalItems: response.data.total,
      });
      return response.data.data; // provide updated fetching for delete and handleAddsuccess
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat skop kriteria:", error);
    }
  },

  // fetch skop semakan options
  fetchSkopSemakans: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/skop-semakan/display-skop-semakan`
      );

      if (Array.isArray(response.data)) {
        set({
          namaSkopSemakanOptions: response.data.map((skopSemakan) => ({
            value: skopSemakan.id,
            label: skopSemakan.namaSkopSemakan,
          })),
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // create skopKriteria
  createSkopKriteria: async (skopKriteriaInput, handleCloseCreateSkopKriteria) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/skop-kriteria`,
        skopKriteriaInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Skop kriteria berjaya ditambah");
        handleCloseCreateSkopKriteria();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // update skopKriteria
  updateSkopKriteria: async (skopKriteriaId, skopKriteriaInput, handleCloseEditSkopKriteria, onUpdateSuccess) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/skop-kriteria/${skopKriteriaId}`,
        skopKriteriaInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Skop kriteria berjaya dikemaskini");
        handleCloseEditSkopKriteria();
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

  // delete skopKriteria
  deleteSkopKriteria: async (skopKriteriaId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/skop-kriteria/${skopKriteriaId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });

        set((state) => ({
          skopKriterias: state.skopKriterias.filter(
            (skopKriteria) => skopKriteria.id !== skopKriteriaId
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

export default useSkopKriteriaStore;
