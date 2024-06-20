import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useJabatanStore = create((set) => ({
    jabatans: [],
    totalPage: 1,
    namaBahagianOptions: [],

    // fetch jabatan
    fetchJabatans: async (page = 1) => {
        try {
          const response = await axiosCustom.get(
            `tetapan-kriteria/jabatan?page=${page}`
          );
          set({
            jabatans: response.data.data,
            totalPage: response.data.last_page,
          });
        } catch (error) {
          console.error("Ralat dalam mengambil maklumat jabatan:", error);
        }
      },

    //  fetch bahagian options
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

    // create jabatan
  createJabatan: async (jabatanInput, handleCloseCreateJabatan) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/jabatan`,
        jabatanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Jabatan berjaya ditambah");
        handleCloseCreateJabatan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  //   update jabatan
  updateJabatan: async (jabatanId, jabatanInput, handleCloseEditJabatan, onUpdateSuccess) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/jabatan/${jabatanId}`,
        jabatanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Jabatan berjaya dikemaskini");
        handleCloseEditJabatan();
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

  // delete jabatan
  deleteJabatan: async (jabatanId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/jabatan/${jabatanId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
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
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },
}));

export default useJabatanStore;