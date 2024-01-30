import React from "react";
import "../../assets/styles/styles_error_pages.css";

function Unauthorized() {
  return (
    <div className="error-container">
      <h1>401 - Unauthorized</h1>
      <p>Tidak dibenarkan. Sila log masuk untuk mengakses sumber ini.</p>
      <p>
        Sila daftar di{" "}
        <a href="https://epenv3.aim.gov.my/">e-Penyelenggaraan</a> jika anda
        masih belum memiliki akaun.
      </p>
    </div>
  );
}

export default Unauthorized;
