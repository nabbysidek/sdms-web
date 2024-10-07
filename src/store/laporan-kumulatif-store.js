import { create } from "zustand";
import axiosCustom from "../axios";

const useLaporanKumulatifStore = create((set) => ({
    audits: [],
    columns: [
        {
          header: "Bil",
          accessorFn: (row, i) => i + 1,
          id: "index",
        },
        {
          header: "Tarikh Mesyuarat Penutup",
          accessorKey: "tarikhAudit",
        },
        {
          header: "Tahap Risiko",
          accessorKey: "tahapRisikoAudit",
          meta: {
            filterVariant: "select",
          },
        },
        {
          header: "Wilayah",
          accessorKey: "wilayah.namaWilayah",
        },
        {
          header: "Cawangan",
          accessorKey: "cawangan.namaCawangan",
        },
        {
          header: "Kesalahan Berulang",
          accessorKey: "kesalahanBerulang",
        },
        {
          header: "Jenis Audit",
          accessorKey: "jenis_audit.namaJenisAudit",
        },
        {
          header: "Skop Semakan",
          accessorKey: "skop_semakan.namaSkopSemakan",
        },
        {
          header: "Skop Kriteria",
          accessorKey: "skop_kriteria.namaSkopKriteria",
        },
        {
          header: "Aktiviti Semakan",
          accessorKey: "aktiviti_semakan.namaAktivitiSemakan",
        },
        {
          header: "Kriteria Ketidakpatuhan",
          accessorKey: "kriteria_ketidakpatuhan.namaKriteriaKetidakpatuhan",
        },
        {
          header: "ID Kakitangan",
          accessorKey: "kakitangan.idKakitangan",
        },
        {
          header: "Nama Kakitangan",
          accessorKey: "kakitangan.namaKakitangan",
        },
        {
          header: "Jawatan Kakitangan",
          accessorKey: "jawatanKakitangan",
        },
        {
          header: "Bahagian",
          accessorKey: "bahagian.namaBahagian",
        },
        {
          header: "Jabatan",
          accessorKey: "jabatan.namaJabatan",
        },
        {
          header: "Unit",
          accessorKey: "unit.namaUnit",
        },
      ],

    // FETCH AUDITS FOR LAPORAN
    fetchAudits: async () => {
        try {
            const response = await axiosCustom.get(
                `/laporan-kumulatif/repot-individu`
            );
            set({
                audits: response.data,
            });
          } catch (error) {
            console.error("Ralat dalam mengambil maklumat audit:", error);
          }
    },

}));

export default useLaporanKumulatifStore;