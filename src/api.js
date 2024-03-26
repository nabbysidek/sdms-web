import axiosCustom from "./axios";

// ========================================= Tetapan Akses Pengguna =========================================
// List Permohonan Akses
export const fetchPermohonanAkses = async (
  permohonanAksesPage = 1,
  permohonanAksesPageSize = 5
) => {
  return (
    await axiosCustom.get(
      `/tetapan-pengguna/tetapan-akses-pengguna/permohonan-akses?page=${permohonanAksesPage}&permohonanAksesPageSize=${permohonanAksesPageSize}`+ permohonanAksesPage
    )
  ).data.permohonanAkses;
};

// List Senarai Pengguna
export const fetchSenaraiPengguna = async (
  senaraiPenggunaPage = 0,
  senaraiPenggunaPageSize = 5
) => {
  return (
    await axiosCustom.get(
      `/tetapan-pengguna/tetapan-akses-pengguna/senarai-pengguna?page=${senaraiPenggunaPage}&senaraiPenggunaPageSize=${senaraiPenggunaPageSize}` + senaraiPenggunaPage
    )
  ).data.senaraiPengguna;
};
