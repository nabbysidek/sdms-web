import React from "react";
import SearchKakitangan from "./Search";
import ShowKakitanganList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexKakitangan() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Kakitangan</h2>
        <hr />
        <h3>Cari Kakitangan</h3>
      </div>

      <div className="page-content">
        <SearchKakitangan />
        <ShowKakitanganList />
      </div>
    </>
  );
}

export default IndexKakitangan;
