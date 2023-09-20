import React from "react";
import "./Auth.css";
import backgroundImage from "../../assets/background-img.png";
import aimLogo from "../../assets/aim-logo.svg";

import styled from "styled-components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";

const PageContainer = styled.div`
  background-image: url(${backgroundImage});
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
  const [showModal, setShowModal] = useState(false);
  const { control, handleSubmit } = useForm();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (data) => {
    // handle form submission here
    console.log(data);
  };

  return (
    <PageContainer>
      <Form
        className="SignInFormContainer FormContainer"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* SIGN IN FORM TEXT HEADER */}
        <div className="signInFormHeader">
          <img className="Logo" src={aimLogo} alt="aim-logo" />
          <h1>Jabatan Audit Dalaman</h1>
          <h3>Selamat Datang</h3>
          <p>Masukkan maklumat log masuk anda</p>
        </div>

        {/* SIGN IN FORM CONTENT */}
        <Form.Group className="mb-3" controlId="staffId">
          <Form.Label className="FormLabel">Id Kakitangan</Form.Label>
          <Controller
            name="staffId"
            control={control}
            defaultValue=""
            rules={{ required: "ID kakitangan diperlukan" }}
            render={({ field }) => (
              <Form.Control type="text" placeholder="123456" {...field} />
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffPassword">
          <Form.Label className="FormLabel">Kata Laluan</Form.Label>
          <Controller
            name="staffPassword"
            control={control}
            defaultValue=""
            rules={{ required: "Kata laluan diperlukan" }}
            render={({ field }) => (
              <Form.Control
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                {...field}
              />
            )}
          />
        </Form.Group>

        <div className="forgotPasswordCta">
          <Link to="#" onClick={openModal}>
            Lupa Kata Laluan?
          </Link>
          {showModal && <ForgotPasswordModal onClose={closeModal} />}
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
    </PageContainer>
  );
}

export default SignIn;
