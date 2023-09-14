import React from "react";
import "./Auth.css";
import backgroundImage from "../../assets/background-img.jpg";
import aimLogo from "../../assets/aim-logo.svg";

import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import TemplateModal from "../../components/modal/TemplateModal";

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
  // FORM VERIFICATION
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  // MODAL DISPLAY
  // useState hook to manage modal display's visibility
  const [showModal1, setShowModal1] = useState(false);

  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const buttons1 = [
    {
      label: "Sahkan Emel",
      variant: "primary",
      onClick: handleCloseModal1,
    },
  ];

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
          <Link to="#" onClick={handleShowModal1}>
            Lupa Kata Laluan?
          </Link>

          <TemplateModal
            show={showModal1}
            handleClose={handleCloseModal1}
            title="Menetap Semula Kata Laluan"
            content={
              <div>
                <p>
                  Untuk menetap semula kata laluan anda, kami perlu mengesahkan
                  emel kakitangan anda. Sila sertakan e-mel kakitangan anda
                  untuk tujuan pengesahan.
                </p>
                <input type="email" placeholder="nama@aim.gov.my" />
              </div>
            }
            buttons={buttons1}
          />
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
