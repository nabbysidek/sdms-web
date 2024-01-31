import React from "react";
import "../../assets/styles/styles_error_pages.css";

function Forbidden() {
  return (
    <div className="error-container">
      <h1>403 - Forbidden</h1>
      <p>
        Akses ditolak. Anda tidak mempunyai kebenaran untuk melihat halaman ini.
      </p>
      <p>
        Sila log masuk dengan kelayakan yang sesuai atau hubungi team sokongan
        untuk mendapatkan bantuan.
      </p>
    </div>
  );
}

export default Forbidden;
