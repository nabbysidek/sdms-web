import React from "react";
import "../../assets/styles/styles_error_pages.css";

export default function UnknownError() {
  return (
    <div className="error-container">
      <h1>520 - Unknown Error</h1>
      <p>
        Ralat yang tidak diketahui telah berlaku semasa memproses permintaan
        anda.
      </p>
      <p>
        Kami memohon maaf atas kesulitan ini. Sila cuba sebentar lagi. Jika
        masalah berterusan, hubungi team sokongan untuk mendapatkan bantuan.
      </p>
    </div>
  );
}
