import React from "react";
import ShowBahagianList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexBahagian() {
  return (
    <div>
      <div className="page-title">
        <h2>Tetapan Bahagian</h2>
        <hr />
        <h3>Tambah Bahagian</h3>
      </div>

      <div className="page-content">
        <ShowBahagianList />
      </div>
    </div>
  );
}

export default IndexBahagian;
