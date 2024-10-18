import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useJenisAuditStore = create((set) => ({
  jenisAudits: [],

  // FETCH JENIS AUDIT
  fetchJenisAudits: async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/jenis-audit`);
      console.log(response);
      set({
        jenisAudits: response.data,
      });
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat jenis audit:", error);
    }
  },

  // CREATE JENIS AUDIT
  createJenisAudit: async (jenisAuditInput, handleCloseCreateJenisAudit) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/jenis-audit`,
        jenisAuditInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        console.log("Jenis audit berjaya ditambah");
        handleCloseCreateJenisAudit();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
  },

  // UPDATE JENIS AUDIT
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
          title: "Success",
          text: response.data.success,
        });
        console.log("Jenis audit berjaya dikemaskini");
        handleCloseEditJenisAudit();
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

  // DELETE JENIS AUDIT
  deleteJenisAudit: async (jenisAuditId) => {
    try {
      const response = await axiosCustom.delete(
        `tetapan-kriteria/jenis-audit/${jenisAuditId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
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
        title: "Error",
        text: error.response.data.error,
      });
    }
  },
}));

export default useJenisAuditStore;
