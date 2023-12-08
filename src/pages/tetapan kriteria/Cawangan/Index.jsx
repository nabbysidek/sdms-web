import React from "react";
import SearchCawangan from "./Search";
import ShowCawanganList from "./Show";
import "../Tetapan.css";

function IndexCawangan() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Cawangan</h2>
        <hr />
        <h3>Cari Cawangan</h3>
      </div>

      <div className="pageContent">
        {/* Search function section */}
        <SearchCawangan />

        {/* Page content section */}
        <ShowCawanganList />
      </div>
    </>
  );
}

export default IndexCawangan;
