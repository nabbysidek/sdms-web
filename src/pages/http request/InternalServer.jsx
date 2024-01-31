import React from "react";
import "../../assets/styles/styles_error_pages.css";

function InternalServer() {
  return (
    <div className="error-container">
      <h1>500 - Internal Server Error</h1>
      <p>Oops! Ada sesuatu yang tidak kena pada pihak kami.</p>
      <p>
        Kami sedang berusaha untuk menyelesaikan isu tersebut. Sila cuba lagi
        kemudian atau hubungi team sokongan untuk mendapatkan bantuan.
      </p>
    </div>
  );
}

export default InternalServer;
