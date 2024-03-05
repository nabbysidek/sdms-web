import React from "react";
import SearchSkopKriteria from "./Search";
import ShowSkopKriteriaList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexSkopKriteria() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Skop Kriteria Ketidakpatuhan</h2>
        <hr />
        <h3>Cari Skop Kriteria Ketidakpatuhan</h3>
      </div>

      <div className="page-content">
        <SearchSkopKriteria />
        <ShowSkopKriteriaList />
      </div>
    </>
  );
}

export default IndexSkopKriteria;
