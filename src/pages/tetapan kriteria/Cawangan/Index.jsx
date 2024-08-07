import React from "react";
import SearchCawangan from "./Search";
import ShowCawanganList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexCawangan() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Cawangan</h2>
        <hr />
        <h3>Cari Cawangan</h3>
      </div>

      <div className="page-content">
        <ShowCawanganList />
      </div>
    </>
  );
}

export default IndexCawangan;
