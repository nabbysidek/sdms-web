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

  // WILAYAH AND CAWANGAN
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
  filterJabatansByBahagian: (bahagianId) => {
    set((state) => {
      const filtered = state.jabatanOptions.filter(
        (jabatan) => String(jabatan.bahagianId) === String(bahagianId)
      );
      return { filteredJabatanOptions: filtered };
    });
  },
  // Unit
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
  filterSkopKriteriasBySkopSemakan: (skopSemakanId) => {
    set((state) => {
      const filtered = state.skopKriteriaOptions.filter(
        (skopKriteria) => String(skopKriteria.skopSemakanId) === String(skopSemakanId)
      );
      return { filteredSkopKriteriaOptions: filtered };
    });
  },
  // Aktiviti Semakan
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
  // Kriteria Ketidakpatuhan
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