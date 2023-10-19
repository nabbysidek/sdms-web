import React from "react";
import "./Auth.css";
import backgroundImage from "../../assets/background-img.png";
import aimLogo from "../../assets/aim-logo.svg";

import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

function SignUp() {
  // FORM VERIFICATION
  // Ensure that the input fields are filled
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageContainer className="signUpResize">
      <Form
        className="SignUpFormContainer FormContainer"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* SIGN IN FORM TEXT HEADER */}
        <div className="formHeader">
          <img className="Logo" src={aimLogo} alt="aim-logo" />
          <h1>Jabatan Audit Dalaman</h1>
          <p>Sila isi ruangan kosong untuk bina akaun baharu</p>
        </div>

        {/* SIGN IN FORM CONTENT */}
        <Form.Group className="mb-3" controlId="staffName">
          <Form.Label className="formLabel">Nama Kakitangan</Form.Label>
          <Controller
            name="staffName"
            control={control}
            defaultValue=""
            rules={{ required: "Nama kakitangan diperlukan" }}
            render={({ field }) => (
              <Form.Control
                className="inputField"
                type="text"
                placeholder="Aina binti Abdul"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffId">
          <Form.Label className="formLabel">Id Kakitangan</Form.Label>
          <Controller
            name="staffId"
            control={control}
            defaultValue=""
            rules={{ required: "ID kakitangan diperlukan" }}
            render={({ field }) => (
              <Form.Control
                className="inputField"
                type="text"
                placeholder="123456"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffEmail">
          <Form.Label className="formLabel">Emel Kakitangan</Form.Label>
          <Controller
            name="staffEmail"
            control={control}
            defaultValue=""
            rules={{ required: "Kata laluan diperlukan" }}
            render={({ field }) => (
              <Form.Control
                className="inputField"
                type="email"
                placeholder="nama@aim.gov.my"
                {...field}
              />
            )}
          />
        </Form.Group>

        <div className="formFieldsContainer">
          <div className="formFieldPair">
            <Form.Group className="mb-3 with-margin" controlId="staffPassword">
              <Form.Label className="formLabel">Kata Laluan</Form.Label>
              <Controller
                name="staffPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Kata laluan diperlukan" }}
                render={({ field }) => (
                  <Form.Control
                    className="inputField"
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                    {...field}
                  />
                )}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="staffConfirmPassword">
              <Form.Label className="formLabel">Ulang Kata Laluan</Form.Label>
              <Controller
                name="staffConfirmPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Kata laluan diperlukan" }}
                render={({ field }) => (
                  <Form.Control
                    className="inputField"
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                    {...field}
                  />
                )}
              />
            </Form.Group>
          </div>
        </div>

        <Button variant="primary" className="authButton" type="submit">
          {" "}
          Mohon Akses{" "}
        </Button>

        {/* CREATE ACCOUNT CTA */}
        <div className="createAccountCta">
          <p>
            Jika ingin log masuk semula{" "}
            {
              <Link to="/" className="allAuthLink">
                tekan di sini
              </Link>
            }
          </p>
        </div>
      </Form>
    </PageContainer>
  );
}

export default SignUp;
