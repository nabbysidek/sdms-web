import React from "react";
import SearchKakitangan from "./Search";
import ShowKakitanganList from "./Show";
import "../Tetapan.css";

function IndexKakitangan() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Kakitangan</h2>
        <hr />
        <h3>Cari Kakitangan</h3>
      </div>

      <div className="pageContent">
        {/* Search function section */}
        <SearchKakitangan />

        {/* Page content section */}
        <ShowKakitanganList />
      </div>
    </>
  );
}

export default IndexKakitangan;
