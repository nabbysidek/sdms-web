import React from "react";
import "../../assets/styles/styles_error_pages.css";

export default function TooManyRequests() {
  return (
    <div className="error-container">
      <h1>429 - Too Many Requests</h1>
      <p>
        Terlalu banyak permintaan. Anda telah melebihi had permintaan yang
        dibenarkan.
      </p>
      <p>
        Sila tunggu seketika sebelum membuat permintaan lagi. Jika masalah
        berterusan, hubungi team sokongan untuk mendapatkan bantuan.
      </p>
    </div>
  );
}
