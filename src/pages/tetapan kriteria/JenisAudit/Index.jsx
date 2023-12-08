import React from "react";
import SearchJenisAudit from "./Search";
import ShowJenisAuditList from "./Show";
import "../Tetapan.css";

function IndexJenisAudit() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Jenis Audit</h2>
        <hr />
        <h3>Cari Jenis Audit</h3>
      </div>

      <div className="pageContent">
        {/* Search function section */}
        <SearchJenisAudit />

        {/* Page content section */}
        <ShowJenisAuditList />
      </div>
    </>
  );
}

export default IndexJenisAudit;
