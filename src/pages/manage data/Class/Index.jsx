import React from "react";
import ShowClassList from "./Show";
import "../../../assets/styles/styles_manage_data.css";

function IndexClass() {
  return (
    <>
      <div className="page-title">
        <h2>Classes</h2>
        <hr />
        <h3>Search Classes</h3>
      </div>

      <div className="page-content">
        <ShowClassList />
      </div>
    </>
  );
}

export default IndexClass;
