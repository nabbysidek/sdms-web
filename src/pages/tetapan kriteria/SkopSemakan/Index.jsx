import React from "react";
import SearchSkopSemakan from "./Search";
import ShowSkopSemakanList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexSkopSemakan() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Skop Semakan</h2>
        <hr />
        <h3>Cari Skop Semakan</h3>
      </div>

      <div className="page-content">
        <SearchSkopSemakan />
        <ShowSkopSemakanList />
      </div>
    </>
  );
}

export default IndexSkopSemakan;
