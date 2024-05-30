import { create } from "zustand";
import axiosCustom from "../axios";

export const useOptionStore = create((set) => ({
  wilayahOptions: [],
  cawanganOptions: [],
  bahagianOptions: [],
  jabatanOptions: [],
  unitOptions: [],
  jenisAuditOptions: [],
  skopSemakanOptions: [],
  skopKriteriaOptions: [],
  aktivitiSemakanOptions: [],
  kriteriaKetidakpatuhanOptions: [],
  // Wilayah
  displayWilayahs: async () => {
    const response = await axiosCustom.get(`/option/get-wilayah`);

    set({ wilayahOptions: response.data });
  },
  // Cawangan
  displayCawangans: async () => {
    const response = await axiosCustom.get(`/option/get-cawangan`);

    set({ cawanganOptions: response.data });
  },
  // Bahagian
  displayBahagians: async () => {
    const response = await axiosCustom.get(`/option/get-bahagian`);

    set({ bahagianOptions: response.data });
  },
  // Jabatan
  displayJabatans: async () => {
    const response = await axiosCustom.get(`/option/get-jabatan`);

    set({ jabatanOptions: response.data });
  },
  // Unit
  displayUnits: async () => {
    const response = await axiosCustom.get(`/option/get-unit`);

    set({ unitOptions: response.data });
  },
  // Jenis Audit
  displayJenisAudits: async () => {
    const response = await axiosCustom.get(`/option/get-jenis-audit`);

    set({ jenisAuditOptions: response.data });
  },
  // Skop Semakan
  displaySkopSemakans: async () => {
    const response = await axiosCustom.get(`/option/get-skop-semakan`);

    set({ skopSemakanOptions: response.data });
  },
  // Skop Kriteria
  displaySkopKriterias: async () => {
    const response = await axiosCustom.get(`/option/get-skop-kriteria`);

    set({ skopKriteriaOptions: response.data });
  },
  // Aktiviti Semakan
  displayAktivitiSemakans: async () => {
    const response = await axiosCustom.get(`/option/get-aktiviti-semakan`);

    set({ aktivitiSemakanOptions: response.data });
  },
  // Kriteria Ketidakpatuhan
  displayKriteriaKetidakpatuhans: async () => {
    const response = await axiosCustom.get(`/option/get-kriteria-ketidakpatuhan`);

    set({ kriteriaKetidakpatuhanOptions: response.data });
  },
}));