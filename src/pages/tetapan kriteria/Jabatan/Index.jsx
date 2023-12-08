import React from "react";
import ShowJabatanList from "./Show";
import SearchJabatan from "./Search";
import "../Tetapan.css";

function IndexJabatan() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Jabatan</h2>
        <hr />
        <h3>Cari Jabatan</h3>
      </div>

      <div className="pageContent">
        {/* Search function section */}
        <SearchJabatan />

        {/* Page content section */}
        <ShowJabatanList />
      </div>
    </>
  );
}

export default IndexJabatan;
