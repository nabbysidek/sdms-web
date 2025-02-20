import React from "react";
import "../../assets/styles/styles_error_pages.css";

function UnprocessableEntity() {
  return (
    <div className="error-container">
      <h1>422 - Unprocessable Entity</h1>
      <p>
        The entity cannot be processed. The server is unable to process the
        request due to invalid data.
      </p>
      <p>
        Please check and correct the input data before resubmitting the request.
        If you need assistance, contact the support team.
      </p>
    </div>
  );
}

export default UnprocessableEntity;
