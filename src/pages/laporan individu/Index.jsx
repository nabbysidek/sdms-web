import React from "react";
import SearchUntukLaporanIndividu from "./Search";
import "../../assets/styles/styles_laporan_individu.css";

function LaporanIndividu() {
  return (
    <>
      <div className="page-title">
        <h2>Laporan Individu</h2>
        <hr />
        <h3>Cari Laporan Individu Kakitangan</h3>
      </div>

      <div className="page-content">
        <SearchUntukLaporanIndividu />
      </div>
    </>
  );
}

export default LaporanIndividu;
