import React from "react";
import "../../assets/styles/styles_error_pages.css";

function Forbidden() {
  return (
    <div className="error-container">
      <h1>403 - Forbidden</h1>
      <p>
        Access denied. You do not have permission to view this page.
      </p>
      <p>
        Please log in with the appropriate credentials or contact the support  
        team for assistance.
      </p>
</div>

  );
}

export default Forbidden;
