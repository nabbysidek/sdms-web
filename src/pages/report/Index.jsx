import React from "react";
import SearchReport from "./Search";
import "../../assets/styles/styles_report.css";

function Report() {
  return (
    <>
      <div className="page-title">
        <h2>Reports</h2>
        <hr />
        <h3>Find Student ID to Report</h3>
      </div>

      <div className="page-content">
        <SearchReport />
      </div>
    </>
  );
}

export default Report;
