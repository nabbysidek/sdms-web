import React from "react";
import ShowJabatanList from "./Show";
import SearchJabatan from "./Search";
import "../../../assets/styles/styles_tetapan_kriteria.css";
function IndexJabatan() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Jabatan</h2>
        <hr />
        <h3>Cari Jabatan</h3>
      </div>

      <div className="page-content">
        <SearchJabatan />
        <ShowJabatanList />
      </div>
    </>
  );
}

export default IndexJabatan;
