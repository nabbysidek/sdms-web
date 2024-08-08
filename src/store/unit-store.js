import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useUnitStore = create((set) => ({
  units: [],
  namaJabatanOptions: [],

  // FETCH UNIT
  fetchUnits: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/unit`
      );
      set({
        units: response.data,
      });
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat unit:", error);
    }
  },

  // FETCH JABATAN OPTIONS
  fetchJabatans: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/jabatan/display-jabatan`
      );

      if (Array.isArray(response.data)) {
        set({
          namaJabatanOptions: response.data.map((jabatan) => ({
            value: jabatan.id,
            label: jabatan.namaJabatan,
          })),
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // CREATE UNIT
  createUnit: async (unitInput, handleCloseCreateUnit) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/unit`,
        unitInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Unit berjaya ditambah");
        handleCloseCreateUnit();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // UPDATE UNIT
  updateUnit: async (unitId, unitInput, handleCloseEditUnit, onUpdateSuccess) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/unit/${unitId}`,
        unitInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Unit berjaya dikemaskini");
        handleCloseEditUnit();
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

  // DELETE UNIT
  deleteUnit: async (unitId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/unit/${unitId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });

        set((state) => ({
          units: state.units.filter((unit) => unit.id !== unitId),
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

export default useUnitStore;
