import { create } from "zustand";
import axiosCustom from "../axios";

const useLaporanKumulatifStore = create((set) => ({
    audits: [],
    columns: [
        {
          header: "Num",
          accessorFn: (row, i) => i + 1,
          id: "index",
        },
        {
          header: "Dates of Audit",
          accessorKey: "tarikhAudit",
        },
        {
          header: "Levels of Risk",
          accessorKey: "tahapRisikoAudit",
          meta: {
            filterVariant: "select",
          },
        },
        {
          header: "States",
          accessorKey: "wilayah.namaWilayah",
        },
        {
          header: "Branches",
          accessorKey: "cawangan.namaCawangan",
        },
        {
          header: "Repeated Offence?",
          accessorKey: "kesalahanBerulang",
        },
        {
          header: "Types of Audit",
          accessorKey: "jenis_audit.namaJenisAudit",
        },
        {
          header: "Review Scopes",
          accessorKey: "skop_semakan.namaSkopSemakan",
        },
        {
          header: "Noncompliance Scopes",
          accessorKey: "skop_kriteria.namaSkopKriteria",
        },
        {
          header: "Activity Reviews",
          accessorKey: "aktiviti_semakan.namaAktivitiSemakan",
        },
        {
          header: "Noncompliances",
          accessorKey: "kriteria_ketidakpatuhan.namaKriteriaKetidakpatuhan",
        },
        {
          header: "Staff ID",
          accessorKey: "kakitangan.idKakitangan",
        },
        {
          header: "Staff Name",
          accessorKey: "kakitangan.namaKakitangan",
        },
        {
          header: "Position",
          accessorKey: "jawatanKakitangan",
        },
        {
          header: "Divisions",
          accessorKey: "bahagian.namaBahagian",
        },
        {
          header: "Departments",
          accessorKey: "jabatan.namaJabatan",
        },
        {
          header: "Units",
          accessorKey: "unit.namaUnit",
        },
      ],

    // FETCH AUDITS FOR LAPORAN
    fetchAudits: async () => {
        try {
            const response = await axiosCustom.get(
                `/laporan-kumulatif/laporan-individu`
            );
            set({
                audits: response.data,
            });
          } catch (error) {
            console.error("Error in retrieving data:", error);
          }
    },

}));

export default useLaporanKumulatifStore;