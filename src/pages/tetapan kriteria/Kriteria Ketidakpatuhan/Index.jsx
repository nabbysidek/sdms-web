import React from "react";
import SearchKriteriaKetidakpatuhan from "./Search";
import ShowKriteriaKetidakpatuhanList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexKriteriaKetidakpatuhan() {
  return (
    <div>
      <div className="page-title">
        <h2>Tetapan Kesalahan Kriteria Ketidakpatuhan</h2>
        <hr />
        <h3>Cari Kesalahan Kriteria Ketidakpatuhan</h3>
      </div>

      <div className="page-content">
        <SearchKriteriaKetidakpatuhan />
        <ShowKriteriaKetidakpatuhanList />
      </div>
    </div>
  );
}

export default IndexKriteriaKetidakpatuhan;
