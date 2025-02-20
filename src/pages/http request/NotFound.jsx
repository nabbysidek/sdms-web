import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/styles_error_pages.css";

function NotFound() {
  return (
    <div className="error-container">
      <h1>404 - Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <p>
        Return back to <Link to="/">sign in</Link>.
      </p>
    </div>
  );
}

export default NotFound;
