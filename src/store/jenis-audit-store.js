import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useJenisAuditStore = create((set) => ({
  jenisAudits: [],

  // fetch jenisAudit
  fetchJenisAudits: async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/jenis-audit`
      );
      console.log(response);
      set({
        jenisAudits: response.data,
      });
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
  
  // search jenis audit
  searchJenisAudits: async (jenisAuditInput) => {
    try {
      const payload = { jenisAuditInput };
      const response = await axiosCustom.post(
        `tetapan-kriteria/carian-jenis-audit`,
        payload
      );
      set({
        jenisAudits: response.data.data.data,
        totalPage: response.data.data.last_page,
        totalItems: response.data.data.total,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Ralat dalam mengambil maklumat jenis audit:", error);
      }
    }
  },
}));

export default useJenisAuditStore;