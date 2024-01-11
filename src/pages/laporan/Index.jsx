import React from "react";
import SearchLaporan from "./Search";
import "../../assets/styles/styles_laporan.css";

function Laporan() {
  return (
    <>
      <div className="page-title">
        <h2>Laporan</h2>
        <hr />
        <h3>Cari Laporan</h3>
      </div>

      <div className="page-content">
        <SearchLaporan />
      </div>
    </>
  );
}

export default Laporan;
