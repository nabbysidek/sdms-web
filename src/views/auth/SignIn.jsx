import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import ModalForgotPassword from "./ForgotPassword/ModalForgotPassword";
import backgroundImage from "../../assets/aim-background-img.png";
import aimLogo from "../../assets/aim-logo.svg";
import "./Auth.css";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        <div className="formHeader">
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
            rules={{
              required: "ID kakitangan diperlukan",
              pattern: {
                value: /^[A-Za-z0-9]{5,}$/i,
                message:
                  "ID kakitangan harus terdiri dari minimal 5 karakter alfanumerik.",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Form.Control type="text" placeholder="123456" {...field} />
                {fieldState.error && (
                  <Form.Text className="text-danger">
                    {fieldState.error.message}
                  </Form.Text>
                )}
              </>
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffPassword">
          <Form.Label className="FormLabel">Kata Laluan</Form.Label>
          <Controller
            name="staffPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Kata laluan diperlukan",
              minLength: {
                value: 8,
                message: "Kata laluan harus terdiri dari minimal 8 karakter.",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Form.Control
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                  {...field}
                />
                {fieldState.error && (
                  <Form.Text className="text-danger">
                    {fieldState.error.message}
                  </Form.Text>
                )}
              </>
            )}
          />
        </Form.Group>

        {/* ... (other form elements) */}

        <div className="forgotPasswordCta">
          <Link to="#" className="allAuthLink" onClick={openModal}>
            Lupa Kata Laluan?
          </Link>
          {showModal && <ModalForgotPassword onClose={closeModal} />}
        </div>

        <Button variant="primary" className="authButton" type="submit">
          {" "}
          Log Masuk{" "}
        </Button>

        {/* CREATE ACCOUNT CTA */}
        <div className="createAccountCta">
          <p>
            Bagi pengguna baru, sila{" "}
            {
              <Link to="/signup" className="allAuthLink">
                tekan di sini
              </Link>
            }
          </p>
        </div>
      </Form>
    </PageContainer>
  );
}

export default SignIn;
