import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ModalForgotPassword from "./ForgotPassword/ModalForgotPassword";
import aimLogo from "../../assets/images/aim-logo.svg";
import "../../assets/styles/styles_auth.css";

function SignIn() {
  // -------------------- FE ---------------------------
  // Forgot Password Modal
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Form validation and submission
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const validation = {
    required: true,
  };

  const onSubmit = (data) => console.log(data);

  return (
    <div className="pg-container">
      <Form
        className="signin-container form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-header">
          <img className="aim-logo" src={aimLogo} alt="aim-logo" />
          <h1>Sistem Jabatan Audit Dalaman</h1>
          <p>Masukkan maklumat log masuk anda</p>
        </div>

        <Form.Group controlId="staffId" className="mb-3">
          <Form.Label className="form-label">Id Kakitangan</Form.Label>
          <Form.Control
            type="text"
            {...register("staffId", { validation })}
            aria-invalid={errors.staffId ? "true" : "false"}
            placeholder="ID kakitangan anda"
          />
          {errors.staffId?.type === "required" && (
            <p role="alert" className="error-message">
              ID kakitangan diperlukan
            </p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffPassword">
          <Form.Label className="form-label">Kata Laluan</Form.Label>
          <Form.Control
            type="password"
            {...register("staffPassword", { validation, minLength: 8 })}
            aria-invalid={errors.staffPassword ? "true" : "false"}
            placeholder="Kata laluan anda"
          />
          {errors.staffPassword?.type === "required" && (
            <p role="alert" className="error-message">
              Kata laluan diperlukan
            </p>
          )}
          {errors.staffPassword?.type === "minLength" && (
            <p role="alert" className="error-message">
              Minima 8 karakter
            </p>
          )}
        </Form.Group>

        <div className="forgot-password">
          <Link to="" className="auth-link" onClick={openModal}>
            Lupa Kata Laluan?
          </Link>
          {showModal && <ModalForgotPassword onClose={closeModal} />}
        </div>

        <Button className="auth-btn" type="submit">
          {" "}
          Log Masuk{" "}
        </Button>

        <div className="create-acc">
          <p>
            Bagi pengguna baru, sila{" "}
            {
              <Link to="/signup" className="auth-link">
                tekan di sini
              </Link>
            }
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
