import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useKriteriaKetidakpatuhanStore = create((set) => ({
  kriteriaKetidakpatuhans: [],
  totalPage: 1,
  totalItems: 0,
  namaAktivitiSemakanOptions: [],

  // fetch kriteria ketidakpatuhan
  fetchKriteriaKetidakpatuhans: async (page = 1) => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/kriteria-ketidakpatuhan?page=${page}`
      );
      set({
        kriteriaKetidakpatuhans: response.data.data,
        totalPage: response.data.last_page,
        totalItems: response.data.total,
      });
      return response.data.data;
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat kriteria ketidakpatuhan:", error);
    }
  },

  // fetch kriteria ketidakpatuhan options
  fetchAktivitiSemakans: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/aktiviti-semakan/display-aktiviti-semakan`
      );

      if (Array.isArray(response.data)) {
        set({
          namaAktivitiSemakanOptions: response.data.map((aktivitiSemakan) => ({
            value: aktivitiSemakan.id,
            label: aktivitiSemakan.namaAktivitiSemakan,
          })),
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // create kriteria ketidakpatuhan
  createKriteriaKetidakpatuhan: async (kriteriaKetidakpatuhanInput, handleCloseCreateKriteriaKetidakpatuhan) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/kriteria-ketidakpatuhan`,
        kriteriaKetidakpatuhanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Kriteria ketidakpatuhan berjaya ditambah");
        handleCloseCreateKriteriaKetidakpatuhan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // update kriteria ketidakpatuhan
  updateKriteriaKetidakpatuhan: async (kriteriaKetidakpatuhanId, kriteriaKetidakpatuhanInput, handleCloseEditKriteriaKetidakpatuhan, onUpdateSuccess) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/kriteria-ketidakpatuhan/${kriteriaKetidakpatuhanId}`,
        kriteriaKetidakpatuhanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        console.log("Kriteria Ketidakpatuhan berjaya dikemaskini");
        handleCloseEditKriteriaKetidakpatuhan();
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

  // delete kriteria ketidakpatuhan
  deleteKriteriaKetidakpatuhan: async (kriteriaKetidakpatuhanId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/kriteria-ketidakpatuhan/${kriteriaKetidakpatuhanId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });

        set((state) => ({
          kriteriaKetidakpatuhans: state.kriteriaKetidakpatuhans.filter((kriteriaKetidakpatuhan) => kriteriaKetidakpatuhan.id !== kriteriaKetidakpatuhanId),
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

export default useKriteriaKetidakpatuhanStore;
