import React from "react";
import SearchJenisAudit from "./Search";
import ShowJenisAuditList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexJenisAudit() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Jenis Audit</h2>
        <hr />
        <h3>Cari Jenis Audit</h3>
      </div>

      <div className="page-content">
        <SearchJenisAudit />
        <ShowJenisAuditList />
      </div>
    </>
  );
}

export default IndexJenisAudit;
