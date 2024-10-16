import React from "react";
import ShowSkopSemakanList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexSkopSemakan() {
  return (
    <>
      <div className="page-title">
        <h2>Review Scopes</h2>
        <hr />
        <h3>Search Review Scopes</h3>
      </div>

      <div className="page-content">
        <ShowSkopSemakanList />
      </div>
    </>
  );
}

export default IndexSkopSemakan;
