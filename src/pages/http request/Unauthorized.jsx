import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/styles_error_pages.css";

function Unauthorized() {
  return (
    <div className="error-container">
      <h1>401 - Unauthorized</h1>
      <p>Unauthorized. Please log in to access this resource.</p>
      <p>
        Please sign up on the <Link to="/signup">sign-up</Link> page if you do
        not have an account yet.
      </p>
    </div>
  );
}

export default Unauthorized;
