import React from "react";
import styled from "styled-components";
import "./Auth.css";

// import { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
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
    <PageContainer>
      <Form
        className="SignUpFormContainer FormContainer"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* SIGN IN FORM TEXT HEADER */}
        <div className="signInFormHeader">
          <img src="" alt="aim-logo" />
          <h1>Jabatan Audit Dalaman</h1>
          <h3>Bina Akaun Baharu</h3>
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
          {errors.staffId && (
            <Form.Text className="text-danger">
              {errors.staffId.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffEmail">
          <Form.Label className="FormLabel">Emel Kakitangan</Form.Label>
          <Controller
            name="staffEmail"
            control={control}
            defaultValue=""
            rules={{ required: "Kata laluan diperlukan" }}
            render={({ field }) => (
              <Form.Control
                type="email"
                placeholder="nama@aim.gov.my"
                {...field}
              />
            )}
          />
          {errors.staffEmail && (
            <Form.Text className="text-danger">
              {errors.staffEmail.message}
            </Form.Text>
          )}
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
          {errors.staffPassword && (
            <Form.Text className="text-danger">
              {errors.staffPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffPassword">
          <Form.Label className="FormLabel">Ulang Kata Laluan</Form.Label>
          <Controller
            name="staffEmail"
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
          {errors.staffPassword && (
            <Form.Text className="text-danger">
              {errors.staffPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          {" "}
          Mohon Akses{" "}
        </Button>

        {/* CREATE ACCOUNT CTA */}
        <div className="createAccountCta">
          <p>Jika ingin log masuk semula {<Link to="/">tekan di sini</Link>}</p>
        </div>
      </Form>
    </PageContainer>
  );
}

export default SignUp;
