import React from "react";
import SearchWilayah from "./Search";
import ShowWilayahList from "./Show";
import "../Tetapan.css";

function IndexWilayah() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Wilayah</h2>
        <hr />
        <h3>Tambah Wilayah</h3>
      </div>

      {/* Search function section */}
      <div className="pageContent">
        <SearchWilayah />

        {/* Page content section */}
        <ShowWilayahList />
      </div>
    </>
  );
}

export default IndexWilayah;
