import React from "react";
import "../../assets/styles/styles_error_pages.css";

function UnprocessableEntity() {
  return (
    <div className="error-container">
      <h1>422 - Unprocessable Entity</h1>
      <p>
        Entiti tidak boleh diproses. Server tidak dapat memproses permintaan
        kerana data tidak sah.
      </p>
      <p>
        Sila semak dan betulkan data input sebelum menyerahkan semula
        permintaan. Jika anda memerlukan bantuan, hubungi team sokongan.
      </p>
    </div>
  );
}

export default UnprocessableEntity;
