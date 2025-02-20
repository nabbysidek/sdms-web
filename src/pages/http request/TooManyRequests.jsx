import React from "react";
import "../../assets/styles/styles_error_pages.css";

export default function TooManyRequests() {
  return (
    <div className="error-container">
      <h1>429 - Too Many Requests</h1>
      <p>Too many requests. You have exceeded the allowed request limit.</p>
      <p>
        Please wait for a while before making another request. If the problem
        persists, contact the support team for assistance.
      </p>
    </div>
  );
}
