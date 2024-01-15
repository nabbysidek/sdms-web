import React from "react";
import SearchWilayah from "./Search";
import ShowWilayahList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexWilayah() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Wilayah</h2>
        <hr />
        <h3>Tambah Wilayah</h3>
      </div>

      <div className="page-content">
        <SearchWilayah />
        <ShowWilayahList />
      </div>
    </>
  );
}

export default IndexWilayah;
