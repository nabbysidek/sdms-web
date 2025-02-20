import React from "react";
import "../../assets/styles/styles_error_pages.css";

function InternalServer() {
  return (
    <div className="error-container">
      <h1>500 - Internal Server Error</h1>
      <p>Oops! Something went wrong on our end.</p>
      <p>
        We are working to resolve the issue. Please try again later or contact
        the support team for assistance.
      </p>
    </div>
  );
}

export default InternalServer;
