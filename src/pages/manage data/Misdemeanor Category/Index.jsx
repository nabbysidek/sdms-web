import React from "react";
import ShowMisdemeanorCategoryList from "./Show";
import "../../../assets/styles/styles_manage_data.css";

function IndexMisdemeanorCategory() {
  return (
    <>
      <div className="page-title">
        <h2>Misdemeanor Category</h2>
        <hr />
        <h3>Search Misdemeanor Category</h3>
      </div>

      <div className="page-content">
        <ShowMisdemeanorCategoryList />
      </div>
    </>
  );
}

export default IndexMisdemeanorCategory;
