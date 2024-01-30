import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/styles_error_pages.css";

function NotFound() {
  return (
    <div className="error-container">
      <h1>404 - Not Found</h1>
      <p>Halaman yang anda cari tidak wujud.</p>
      <p>
        Kembali ke halaman <Link to="/dashboard">dashboard</Link>.
      </p>
    </div>
  );
}

export default NotFound;
