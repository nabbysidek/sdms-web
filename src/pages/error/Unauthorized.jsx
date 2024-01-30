import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/styles_error_pages.css";

function Unauthorized() {
  return (
    <div className="error-container">
      <h1>401 - Unauthorized</h1>
      <p>Tidak dibenarkan. Sila log masuk untuk mengakses sumber ini.</p>
      <p>
        Sila daftar di halaman <Link to="/signup">daftar masuk</Link> jika anda
        masih belum memiliki akaun.
      </p>
    </div>
  );
}

export default Unauthorized;
