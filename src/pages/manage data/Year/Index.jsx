import React from "react";
import ShowYearList from "./Show";
import "../../../assets/styles/styles_manage_data.css";

function IndexYear() {
  return (
    <>
      <div className="page-title">
        <h2>Years</h2>
        <hr />
        <h3>Search Years</h3>
      </div>

      <div className="page-content">
        <ShowYearList />
      </div>
    </>
  );
}

export default IndexYear;
