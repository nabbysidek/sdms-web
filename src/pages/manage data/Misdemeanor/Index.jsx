import React from "react";
import ShowMisdemeanorList from "./Show";
import "../../../assets/styles/styles_manage_data.css";

function IndexMisdemeanor() {
  return (
    <>
      <div className="page-title">
        <h2>Misdemeanor</h2>
        <hr />
        <h3>Search Misdemeanor</h3>
      </div>

      <div className="page-content">
        <ShowMisdemeanorList />
      </div>
    </>
  );
}

export default IndexMisdemeanor;
