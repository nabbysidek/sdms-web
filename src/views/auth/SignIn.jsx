import React from "react";
import styled from "styled-components";
import "./Auth.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

function SignIn() {
  // INPUT VALIDATION: ENSURE FILLED
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
      <div className="background-image">
        <Form
          className="SignInFormContainer FormContainer"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          {/* SIGN IN FORM TEXT HEADER */}
          <div className="signInFormHeader">
            <img src="" alt="aim-logo" />
            <h1>Jabatan Audit Dalaman</h1>
            <h3>Selamat Datang</h3>
            <p>Masukkan maklumat log masuk anda</p>
          </div>

          {/* SIGN IN FORM CONTENT */}
          <Form.Group className="mb-3" controlId="signInStaffId">
            <Form.Control
              required
              type="text"
              placeholder="Masukkan ID kakitangan anda"
            />
            <Form.Control.Feedback type="invalid">
              Sila masukkan ID kakitangan anda
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="signInPassword">
            <Form.Control
              required
              type="password"
              placeholder="Masukkan kata laluan anda"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Sila masukkan kata laluan anda
            </Form.Control.Feedback>
          </Form.Group>

          <div className="forgotPasswordCta">
            <Link to="/">Lupa Kata Laluan?</Link>
          </div>

          <Button variant="primary" type="submit">
            {" "}
            Log Masuk{" "}
          </Button>

          {/* CREATE ACCOUNT CTA */}
          <div className="createAccountCta">
            <p>
              Bagi pengguna baru, sila {<Link to="/signup">tekan di sini</Link>}
            </p>
          </div>
        </Form>
      </div>
    </PageContainer>
  );
}

export default SignIn;
