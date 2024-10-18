import React from "react";
import SearchUntukLaporanIndividu from "./Search";
import "../../assets/styles/styles_laporan_individu.css";

function LaporanIndividu() {
  return (
    <>
      <div className="page-title">
        <h2>Audits</h2>
        <hr />
        <h3>Find Staff's Audit Records</h3>
      </div>

      <div className="page-content">
        <SearchUntukLaporanIndividu />
      </div>
    </>
  );
}

export default LaporanIndividu;
