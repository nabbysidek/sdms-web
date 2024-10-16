import React from "react";
import ShowKakitanganList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexKakitangan() {
  return (
    <>
      <div className="page-title">
        <h2>Audited Staff</h2>
        <hr />
        <h3>Search Audited Staff Records</h3>
      </div>

      <div className="page-content">
        <ShowKakitanganList />
      </div>
    </>
  );
}

export default IndexKakitangan;
