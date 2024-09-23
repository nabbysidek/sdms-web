import React from "react";
import ShowKriteriaKetidakpatuhanList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexKriteriaKetidakpatuhan() {
  return (
    <div>
      <div className="page-title">
        <h2>Tetapan Kriteria Ketidakpatuhan</h2>
        <hr />
        <h3>Cari Kriteria Ketidakpatuhan</h3>
      </div>

      <div className="page-content">
        <ShowKriteriaKetidakpatuhanList />
      </div>
    </div>
  );
}

export default IndexKriteriaKetidakpatuhan;
