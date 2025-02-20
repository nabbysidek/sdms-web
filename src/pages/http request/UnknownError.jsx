import React from "react";
import "../../assets/styles/styles_error_pages.css";

export default function UnknownError() {
  return (
    <div className="error-container">
      <h1>520 - Unknown Error</h1>
      <p>An unknown error has occurred while processing your request.</p>
      <p>
        We apologize for this inconvenience. Please try again later. If the
        problem persists, contact the support team for assistance.
      </p>
    </div>
  );
}
