import React from "react";
import "../../assets/styles/styles_error_pages.css";

function BadRequest() {
  return (
    <div className="error-container">
      <h1>400 - Bad Request</h1>
      <p>Permintaan tidak baik. Server tidak dapat memproses permintaan.</p>
      <p>
        Sila semak permintaan anda dan cuba lagi. Jika masalah berterusan,
        hubungi team sokongan untuk mendapatkan bantuan.
      </p>
    </div>
  );
}

export default BadRequest;
