import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useSkopKriteriaStore = create((set) => ({
  skopKriterias: [],
  namaSkopSemakanOptions: [],

  // Fetch Noncompliance Scopes
  fetchSkopKriterias: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/skop-kriteria`);
      set({
        skopKriterias: response.data,
      });
    } catch (error) {
      console.error("Error in fetching noncompliance scopes:", error);
    }
  },

  // Fetch Review Scopes options
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

  // Create Noncompliance Scopes
  createSkopKriteria: async (
    skopKriteriaInput,
    handleCloseCreateSkopKriteria
  ) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/skop-kriteria`,
        skopKriteriaInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in creating a noncompliance scope.");
        handleCloseCreateSkopKriteria();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // Update Noncompliance Scope
  updateSkopKriteria: async (
    skopKriteriaId,
    skopKriteriaInput,
    handleCloseEditSkopKriteria,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/skop-kriteria/${skopKriteriaId}`,
        skopKriteriaInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Successful in updating the noncompliance scope.");
        handleCloseEditSkopKriteria();
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

  // Delete Noncompliance Scope
  deleteSkopKriteria: async (skopKriteriaId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/skop-kriteria/${skopKriteriaId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
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
        title: "Error",
        text: error.response.data.error,
      });
    }
  },
}));

export default useSkopKriteriaStore;
