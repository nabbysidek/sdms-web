import React from "react";
import SearchLaporan from "./Search";
import "./Laporan.css";

function Laporan() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Laporan</h2>
        <hr />
        <h3>Cari Laporan Ketidakpatuhan</h3>
      </div>

      {/* Page search section */}
      <div className="pageContent">
        {/* Search section */}
        <SearchLaporan />
      </div>
    </>
  );
}

export default Laporan;
