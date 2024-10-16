import React from "react";
import ShowSkopKriteriaList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexSkopKriteria() {
  return (
    <>
      <div className="page-title">
        <h2>Noncompliance Scopes</h2>
        <hr />
        <h3>Search Noncompliance Scopes</h3>
      </div>

      <div className="page-content">
        <ShowSkopKriteriaList />
      </div>
    </>
  );
}

export default IndexSkopKriteria;
