import React from "react";
import "../../assets/styles/styles_error_pages.css";

export default function ServiceUnavailable() {
  return (
    <div className="error-container">
      <h1>503 - Service Unavailable</h1>
      <p>Service unavailable. We are currently undergoing maintenance.</p>
      <p>
        We apologize for the inconvenience. Please check back in a few hours for
        fully restored service.
      </p>
    </div>
  );
}
