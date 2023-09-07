import React from "react";
import styled from "styled-components";
import "./Auth.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PageContainer = styled.div`
  background-image: url("https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
    <PageContainer>
      <div className="page">
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
              <Form.Control
                type="email"
                placeholder="Emel Kakitangan"
                required
              />
              <Form.Control.Feedback type="invalid">
                Sila masukkan emel kakitangan anda
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="signUpStaffID">
              <Form.Control type="text" placeholder="ID Kakitangan" required />
              <Form.Control.Feedback type="invalid">
                Sila masukkan ID kakitangan anda
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="signUpStaffPassword">
              <Form.Control
                type="password"
                placeholder="Kata Laluan"
                required
              />
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
      </div>
    </PageContainer>
  );
}

export default SignUp;
