import React from "react";
import SearchUnit from "./Search";
import ShowUnitList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexUnit() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Unit</h2>
        <hr />
        <h3>Cari Unit</h3>
      </div>

      <div className="page-content">
        <SearchUnit />
        <ShowUnitList />
      </div>
    </>
  );
}

export default IndexUnit;
