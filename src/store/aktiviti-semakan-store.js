import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useAktivitiSemakanStore = create((set) => ({
  aktivitiSemakans: [],
  namaSkopKriteriaOptions: [],

  // Fetch Activity Reviews
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
      console.error("Error in fetching activity reviews:", error);
    }
  },

  // Fetch Review Scopes Options
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

  // Create Activity Reviews
  createAktivitiSemakan: async (
    aktivitiSemakanInput,
    handleCloseCreateAktivitiSemakan
  ) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/aktiviti-semakan`,
        aktivitiSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in creating an activity review.");
        handleCloseCreateAktivitiSemakan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update Activity Review
  updateAktivitiSemakan: async (
    aktivitiSemakanId,
    aktivitiSemakanInput,
    handleCloseEditAktivitiSemakan,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/aktiviti-semakan/${aktivitiSemakanId}`,
        aktivitiSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the activity review.");
        handleCloseEditAktivitiSemakan();
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

  // DELETE AKTIVITI SEMAKAN
  deleteAktivitiSemakan: async (aktivitiSemakanId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/aktiviti-semakan/${aktivitiSemakanId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });

        set((state) => ({
          aktivitiSemakans: state.aktivitiSemakans.filter(
            (aktivitiSemakan) => aktivitiSemakan.id !== aktivitiSemakanId
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

export default useAktivitiSemakanStore;
