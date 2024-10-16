import React from "react";
import ShowCawanganList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexCawangan() {
  return (
    <>
      <div className="page-title">
        <h2>Branches</h2>
        <hr />
        <h3>Search Branches</h3>
      </div>

      <div className="page-content">
        <ShowCawanganList />
      </div>
    </>
  );
}

export default IndexCawangan;
