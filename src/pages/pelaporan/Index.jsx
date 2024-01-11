import React from "react";
import SearchPelaporan from "./Search";
import "../../assets/styles/styles_pelaporan.css";

function Pelaporan() {
  return (
    <>
      <div className="page-title">
        <h2>Pelaporan</h2>
        <hr />
        <h3>Cari Kakitangan</h3>
      </div>

      <div className="page-content">
        <SearchPelaporan />
      </div>
    </>
  );
}

export default Pelaporan;
