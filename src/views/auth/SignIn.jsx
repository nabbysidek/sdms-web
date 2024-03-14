import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";
import aimLogo from "../../assets/images/aim-logo.svg";
import "../../assets/styles/styles_auth.css";
import { useNavigate } from "react-router-dom";
import axiosCustom from "../../axios";

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

  const [staffId,setstaffId]= useState("");
  const [staffPassword,setstaffPassword]= useState("");

  // -------------------- BE ---------------------------
  const navigate = useNavigate();

  // Sign in user
  const handleSignIn = async (signInInput) => {
    try {
      const response = await axiosCustom.post(`/auth/sign-in`, signInInput);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        navigate("/dashboard");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error); // Error related to API response or client side
    }
  };

  return (
    <div className="pg-container">
      <Form
        className="signin-container form-container"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="form-header">
          <img className="aim-logo" src={aimLogo} alt="aim-logo" />
          <h1>Sistem Jabatan Audit Dalaman</h1>
          <p>Masukkan maklumat log masuk anda</p>
        </div>

        <Form.Group controlId="idAuditor" className="mb-3">
          <Form.Label className="form-label">Id Kakitangan</Form.Label>
          <Form.Control
            type="text"
            {...register("idAuditor", { required: true })}
            aria-invalid={errors.idAuditor ? "true" : "false"}
            placeholder="ID kakitangan anda" onChange={(e)=>setstaffId(e.target.value)}
          />
          {errors.idAuditor?.type === "required" && (
            <p role="alert" className="error-message">
              ID kakitangan diperlukan
            </p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="kataLaluanAuditor">
          <Form.Label className="form-label">Kata Laluan</Form.Label>
          <Form.Control
            type="password"
            {...register("kataLaluanAuditor", { required: true, minLength: 8 })}
            aria-invalid={errors.kataLaluanAuditor ? "true" : "false"}
            placeholder="Kata laluan anda" onChange={(e)=>setstaffPassword(e.target.value)}
          />
          {errors.kataLaluanAuditor?.type === "required" && (
            <p role="alert" className="error-message">
              Kata laluan diperlukan
            </p>
          )}
          {errors.kataLaluanAuditor?.type === "minLength" && (
            <p role="alert" className="error-message">
              Minima 8 karakter
            </p>
          )}
        </Form.Group>

        <div className="forgot-password">
          <Link to="" className="auth-link" onClick={openModal}>
            Lupa Kata Laluan?
          </Link>
          {showModal && <ForgotPasswordModal onClose={closeModal} />}
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
