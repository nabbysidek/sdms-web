import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useJenisAuditStore = create((set) => ({
  jenisAudits: [],
  totalPage: 1,
  totalItems: 0,

  // fetch jenisAudit
  fetchJenisAudits: async (page = 1) => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/jenis-audit?page=${page}`
      );
      set({
        jenisAudits: response.data.data,
        totalPage: response.data.last_page,
        totalItems: response.data.total,
      });
      return response.data.data; // provide updated fetching for delete and handleAddsuccess
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat jenis audit:", error);
    }
  },

  // create jenisAudit
  createJenisAudit: async (jenisAuditInput, handleCloseCreateJenisAudit) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/jenis-audit`,
        jenisAuditInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Jenis audit berjaya ditambah");
        handleCloseCreateJenisAudit();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,
      });
    }
  },

  // update jenisAudit
  updateJenisAudit: async (
    jenisAuditId,
    jenisAuditInput,
    handleCloseEditJenisAudit,
    onUpdateSuccess
  ) => {
    try {
      const response = await axiosCustom.put(
        `tetapan-kriteria/jenis-audit/${jenisAuditId}`,
        jenisAuditInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Jenis audit berjaya dikemaskini");
        handleCloseEditJenisAudit();
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

  // delete jenisAudit
  deleteJenisAudit: async (jenisAuditId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/jenis-audit/${jenisAuditId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });

        set((state) => ({
          jenisAudits: state.jenisAudits.filter(
            (jenisAudit) => jenisAudit.id !== jenisAuditId
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

export default useJenisAuditStore;