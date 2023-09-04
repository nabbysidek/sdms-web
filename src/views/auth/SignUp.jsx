import React from "react";
import "./Auth.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SignUp() {
  // FORM INPUT VALIDATION: ENSURE FILLED
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="SignUpFormContainer FormContainer">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* SIGN UP FORM HEADER */}
        <div className="signUpFormHeader">
          <img src="" alt="aim-logo" />
          <h1>Jabatan Audit Dalaman</h1>
          <h3>Permohonan Akses</h3>
          <p>Masukkan maklumat kakitangan anda</p>
        </div>

        {/* SIGN UP FORM CONTENT */}
        <Form.Group className="mb-3" controlId="signUpStaffEmail">
          <Form.Control type="email" placeholder="Emel Kakitangan" required />
          <Form.Control.Feedback type="invalid">
            Sila masukkan emel kakitangan anda
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="signUpStaffPassword">
          <Form.Control type="password" placeholder="Kata Laluan" required />
          <Form.Control.Feedback type="invalid">
            Sila masukkan emel kakitangan anda
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Mohon Akses
        </Button>

        {/* REDIRECT TO SIGN IN PAGE CTA */}
        <div className="signInCta">
          <p>
            Klik di sini untuk kembali semula ke{" "}
            {<Link to="/">halaman log masuk</Link>}
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
