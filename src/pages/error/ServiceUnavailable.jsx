import React from "react";
import "../../assets/styles/styles_error_pages.css";

export default function ServiceUnavailable() {
  return (
    <div className="error-container">
      <h1>503 - Service Unavailable</h1>
      <p>
        Perkhidmatan tidak tersedia. Pada masa ini kami sedang menjalani
        penyelenggaraan.
      </p>
      <p>
        Kami memohon maaf atas kesulitan ini. Sila semak semula dalam beberapa
        jam untuk mendapatkan perkhidmatan yang dipulihkan sepenuhnya.
      </p>
    </div>
  );
}
