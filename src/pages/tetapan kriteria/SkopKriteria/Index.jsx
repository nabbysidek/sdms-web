import React from "react";
import SearchSkopKriteria from "./Search";
import ShowSkopKriteriaList from "./Show";
import "../Tetapan.css";

function IndexSkopKriteria() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Skop Kriteria</h2>
        <hr />
        <h3>Cari Skop Kriteria</h3>
      </div>

      <div className="pageContent">
        {/* Search function section */}
        <SearchSkopKriteria />

        {/* Page content section */}
        <ShowSkopKriteriaList />
      </div>
    </>
  );
}

export default IndexSkopKriteria;
