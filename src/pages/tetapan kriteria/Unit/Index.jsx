import React from "react";
import ShowUnitList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexUnit() {
  return (
    <>
      <div className="page-title">
        <h2>Units</h2>
        <hr />
        <h3>Search Units</h3>
      </div>

      <div className="page-content">
        <ShowUnitList />
      </div>
    </>
  );
}

export default IndexUnit;
