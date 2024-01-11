import React from "react";
import SearchPelaporan from "./Search";
import "./Pelaporan.css";

function Pelaporan() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Pelaporan</h2>
        <hr />
        <h3>Cari Kakitangan</h3>
      </div>

      {/* Page search section */}
      <div className="pageContent">
        {/* Call for the search bar component */}
        <SearchPelaporan />
      </div>
    </>
  );
}

export default Pelaporan;
