import React from "react";
import SearchUnit from "./Search";
import ShowUnitList from "./Show";
import "../Tetapan.css";

function IndexUnit() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Unit</h2>
        <hr />
        <h3>Cari Unit</h3>
      </div>

      <div className="pageContent">
        {/* Search function section */}
        <SearchUnit />

        {/* Page content section */}
        <ShowUnitList />
      </div>
    </>
  );
}

export default IndexUnit;
