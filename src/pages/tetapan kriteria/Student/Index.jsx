import React from "react";
import ShowStudentList from "./Show";
import "../../../assets/styles/styles_tetapan_kriteria.css";

function IndexStudents() {
  return (
    <>
      <div className="page-title">
        <h2>Students</h2>
        <hr />
        <h3>Search Students ID</h3>
      </div>

      <div className="page-content">
        <ShowStudentList />
      </div>
    </>
  );
}

export default IndexStudents;
