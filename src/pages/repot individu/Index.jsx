import React from "react";
import SearchUntukRepotIndividu from "./Search";
import "../../assets/styles/styles_repot_individu.css";

function RepotIndividu() {
  return (
    <>
      <div className="page-title">
        <h2>Repot Individu</h2>
        <hr />
        <h3>Cari Kakitangan</h3>
      </div>

      <div className="page-content">
        <SearchUntukRepotIndividu />
      </div>
    </>
  );
}

export default RepotIndividu;
