import React from "react";
import ShowWilayahList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexWilayah() {
  return (
    <>
      <div className="page-title">
        <h2>States</h2>
        <hr />
        <h3>Search States</h3>
      </div>

      <div className="page-content">
        <ShowWilayahList />
      </div>
    </>
  );
}

export default IndexWilayah;
