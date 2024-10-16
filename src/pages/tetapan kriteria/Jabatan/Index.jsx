import React from "react";
import ShowJabatanList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";
function IndexJabatan() {
  return (
    <>
      <div className="page-title">
        <h2>Departments</h2>
        <hr />
        <h3>Search Departments</h3>
      </div>

      <div className="page-content">
        <ShowJabatanList />
      </div>
    </>
  );
}

export default IndexJabatan;
