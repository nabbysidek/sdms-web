import React from "react";
import "../../assets/styles/styles_error_pages.css";

function BadRequest() {
  return (
    <div className="error-container">
      <h1>400 - Bad Request</h1>
      <p>Bad request. The server could not process the request.</p>
      <p>
        Please check your request and try again. If the problem persists,
        contact the support team for assistance.
      </p>
    </div>
  );
}

export default BadRequest;
