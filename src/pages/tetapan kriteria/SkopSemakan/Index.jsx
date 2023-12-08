import React from "react";
import SearchSkopSemakan from "./Search";
import ShowSkopSemakanList from "./Show";
import "../Tetapan.css";

function IndexSkopSemakan() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Skop Semakan</h2>
        <hr />
        <h3>Cari Skop Semakan</h3>
      </div>

      <div className="pageContent">
        {/* Search function section */}
        <SearchSkopSemakan />

        {/* Page content section */}
        <ShowSkopSemakanList />
      </div>
    </>
  );
}

export default IndexSkopSemakan;
