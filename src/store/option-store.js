import { create } from "zustand";
import axiosCustom from "../axios";

export const useOptionStore = create((set) => ({
  wilayahOptions: [],
  cawanganOptions: [],
  filteredCawanganOptions: [],

  bahagianOptions: [],
  jabatanOptions: [],
  unitOptions: [],
  filteredJabatanOptions: [],
  filteredUnitOptions: [],

  jenisAuditOptions: [],
  skopSemakanOptions: [],
  skopKriteriaOptions: [],
  aktivitiSemakanOptions: [],
  kriteriaKetidakpatuhanOptions: [],
  filteredSkopKriteriaOptions: [],
  filteredAktivitiSemakanOptions: [],
  filteredKriteriaKetidakpatuhanOptions: [],

  // States and Branches
  displayWilayahs: async () => {
    const response = await axiosCustom.get(`/option/get-wilayah`);
    set({ wilayahOptions: response.data });
  },

  displayCawangans: async () => {
    const response = await axiosCustom.get(`/option/get-cawangan`);
    set({ cawanganOptions: response.data });
  },

  filterCawangansByWilayah: (wilayahId) => {
    set((state) => {
      const filtered = state.cawanganOptions.filter(
        (cawangan) => String(cawangan.wilayahId) === String(wilayahId)
      );
      return { filteredCawanganOptions: filtered };
    });
  },

  // Divisions
  displayBahagians: async () => {
    const response = await axiosCustom.get(`/option/get-bahagian`);

    set({ bahagianOptions: response.data });
  },
  // Departments
  displayJabatans: async () => {
    const response = await axiosCustom.get(`/option/get-jabatan`);

    set({ jabatanOptions: response.data });
  },
  filterJabatansByBahagian: (bahagianId) => {
    set((state) => {
      const filtered = state.jabatanOptions.filter(
        (jabatan) => String(jabatan.bahagianId) === String(bahagianId)
      );
      return { filteredJabatanOptions: filtered };
    });
  },
  // Units
  displayUnits: async () => {
    const response = await axiosCustom.get(`/option/get-unit`);

    set({ unitOptions: response.data });
  },
  filterUnitsByJabatan: (jabatanId) => {
    set((state) => {
      const filtered = state.unitOptions.filter(
        (unit) => String(unit.jabatanId) === String(jabatanId)
      );
      return { filteredUnitOptions: filtered };
    });
  },


  // Types of Audits
  displayJenisAudits: async () => {
    const response = await axiosCustom.get(`/option/get-jenis-audit`);

    set({ jenisAuditOptions: response.data });
  },

  // Review Scopes
  displaySkopSemakans: async () => {
    const response = await axiosCustom.get(`/option/get-skop-semakan`);

    set({ skopSemakanOptions: response.data });
  },
  // Noncompliance Scopes
  displaySkopKriterias: async () => {
    const response = await axiosCustom.get(`/option/get-skop-kriteria`);

    set({ skopKriteriaOptions: response.data });
  },
  filterSkopKriteriasBySkopSemakan: (skopSemakanId) => {
    set((state) => {
      const filtered = state.skopKriteriaOptions.filter(
        (skopKriteria) => String(skopKriteria.skopSemakanId) === String(skopSemakanId)
      );
      return { filteredSkopKriteriaOptions: filtered };
    });
  },
  // Activity Reviews
  displayAktivitiSemakans: async () => {
    const response = await axiosCustom.get(`/option/get-aktiviti-semakan`);

    set({ aktivitiSemakanOptions: response.data });
  },
  filterAktivitiSemakansBySkopKriteria: (skopKriteriaId) => {
    set((state) => {
      const filtered = state.aktivitiSemakanOptions.filter(
        (aktivitiSemakan) => String(aktivitiSemakan.skopKriteriaId) === String(skopKriteriaId)
      );
      return { filteredAktivitiSemakanOptions: filtered };
    });
  },
  // Noncompliances
  displayKriteriaKetidakpatuhans: async () => {
    const response = await axiosCustom.get(`/option/get-kriteria-ketidakpatuhan`);

    set({ kriteriaKetidakpatuhanOptions: response.data });
  },
  filterKriteriaKetidakpatuhansByAktivitiSemakan: (aktivitiSemakanId) => {
    set((state) => {
      const filtered = state.kriteriaKetidakpatuhanOptions.filter(
        (kriteriaKetidakpatuhan) => String(kriteriaKetidakpatuhan.aktivitiSemakanId) === String(aktivitiSemakanId)
      );
      return { filteredKriteriaKetidakpatuhanOptions: filtered };
    });
  },
}));